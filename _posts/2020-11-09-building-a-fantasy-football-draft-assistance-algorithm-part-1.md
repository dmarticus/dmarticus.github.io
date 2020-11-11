---
title: "Building a Fantasy Football Draft Assistance Algorithm Part One: Collecting, Cleaning, and Preparing the Data"
layout: post
tags: [fun, data science, python]
post_summary: "Constructing a Fantasy Football draft assistance algorithm using Gaussian Kernel Density Estimation (Gaussian KDE) Part One: Collecting, Cleaning, and Preparing the Data."
---

# Building a Fantasy Football Draft Assistance Algorithm: Part One
### Part One of a two-part series.  Part One focuses on collecting, cleaning, and preparing the data that will power the algorithm.

## Context

I'm in a pretty competitive fantasy football league with some friends, and back when we started the season I wanted to find an edge when it came to drafting against them so that I could put together the best team possible to start the season (if you're not familiar with fantasy football, check out [quick but thorough summary](https://www.vox.com/2014/8/15/6003131/fantasy-football-how-to-play-draft-rankings)).  Most fantasy platforms provide existing player recommendations to assist with drafting players, and ours (ESPN) was no exception, but I wanted to make my own, preferably through combining multiple different data sources to come up with a more robust model for ranking the players.  Ultimately, my goal was to make a tool into which I could feed (1) the player picked and (2) the position in the draft in which that player was picked, and it would return the best possible candidate for every position when it was my turn to pick.  I called my tool DAsHA, which stands for "Draft Assistance Heuristic Algorithm".

## Methodology

What is Gaussian KDE?
Why use it?
What do I expect to get out of it?
Inverse Cumulative Density Data

## Implementation

### Step 1 - Collecting the data

I wanted a diverse set of projections to improve the accuracy of my KDE, so I collected the projected player performance data from the following five sources: [ESPN](https://fantasy.espn.com/football/players/projections?leagueFormatId=1), [Fantasy Sharks](https://www.fantasysharks.com/apps/Projections/SeasonProjections.php?pos=ALL), [Fantasy Pros](https://www.fantasypros.com/nfl/rankings/consensus-cheatsheets.php?loggedin=&my-experts=ALL), [Fantasy Football Toolbox](https://fftoolbox.fulltimefantasy.com/football/rankings/index.php?noppr=true), and [NFL.com](https://fantasy.nfl.com/research/projections?position=O&sort=projectedPts&statCategory=projectedStats&statSeason=2020&statType=seasonProjectedStats#researchProjections=researchProjections%2C%2Fresearch%2Fprojections%253Fposition%253DO%2526statCategory%253DprojectedStats%2526statSeason%253D2020%2526statType%253DseasonProjectedStats%2526statWeek%253D1%2Creplace).  I also used [Yahoo!](https://football.fantasysports.yahoo.com/f1/826195/1/editprerank) for the projected fantasy draft positions.

Collecting this data posed a challenge initially, since none of these sources had public APIs that I could figure out how to work with, and I didn't want to write some sort of HTML scraper to import the data into a CSV. Fortunately, though, after a little research (turns out there are a LOT of sports bloggers), I found out that Excel has a native method to [import data from the web](https://www.spreadsheetsports.com/free-tools/how-to-download-sport-data-into-a-spreadsheet/) that just worked out of the box for the above links.  Using this approach, I made an Excel spreadsheet for each data source and put them all into the `/raw_data` directory at the root of my project.

```
raw_data/
    |-- Yahoo_2020_Draft_Positions.xlsx
    |-- Fantasy_Pros_2020_proj.xlsx
    |-- NFL_2020_proj.xlsx'
    |-- Fantasy_Shark_2020_proj.xlsx
    |-- Sports_Illustrated_2020_proj.xls
    |-- ESPN_2020_proj.xlsx
```

### Step 2 - Cleaning the data

Now that I had the data, I set up my Python notebook to use the relevant data science libraries to generate a Gaussian KDE.  For this project, I used [NumPy](https://numpy.org/), [pandas](https://pandas.pydata.org/), [matplotlib](https://matplotlib.org/), [SciPy](https://www.scipy.org/), and [statsmodels](https://www.statsmodels.org/stable/index.html).

```python
import numpy as np
import pandas as pd
%matplotlib inline
from scipy import stats
import statsmodels.api as sm
import matplotlib.pyplot as plt
from statsmodels.distributions.mixture_rvs import mixture_rvs
```

Next, I compiled and merged the data using the on player names from the Yahoo! draft list as the primary index (since my goal for DAsHA is to look up information based on the player name).   

TODO MORE ON WHAT I MEAN BY THIS

```python
# load Yahoo! draft positions
df = pd.read_excel('./raw_data/Yahoo_2020_Draft_Positions.xlsx')
# strip the names so they can be directly compared to other lists
df['Name'] = df['Name'].str.strip()

# load Fantasy Pros Projections
df_fantasy_pros = pd.read_excel('./raw_data/Fantasy_Pros_2020_proj.xlsx')

# construct temporary data frame to merge relevant info
df_temp = pd.DataFrame()
df_temp['Name'] = df_fantasy_pros['PLAYER'].str.strip()
df_temp['fp_pts'] = df_fantasy_pros['FAN PTS']

# merge df with temporary df
df = pd.merge(df, df_temp, on='Name', how ='outer')

# import NFL projections
df_nfl = pd.read_excel('./raw_data/NFL_2020_proj.xlsx')
df_temp = pd.DataFrame()
df_temp['Name'] = df_nfl['PLAYER'].str.strip()
df_temp['nfl_pts'] = df_nfl['POINTS']

df = pd.merge(df, df_temp, on='Name', how ='outer')

# import ESPN projections
df_espn = pd.read_excel('./raw_data/ESPN_2020_proj.xlsx')
df_temp = pd.DataFrame()
df_temp['Name'] = df_espn['PLAYER'].str.strip()
df_temp['espn_pts'] = df_espn['TOT']

df = pd.merge(df, df_temp, on='Name', how ='outer')

# import Fantasy Shark projections
df_fantasy_shark = pd.read_excel('./raw_data/Fantasy_Shark_2020_proj.xlsx')
df_temp = pd.DataFrame()
df_temp['Name'] = df_fantasy_shark['Name'].str.strip()
df_temp['fs_pts'] = df_fantasy_shark['Fantasy Points']

df = pd.merge(df, df_temp, on='Name', how ='outer')

# import Sports Illustrated projections
df_si = pd.read_excel('./raw_data/Sports_Illustrated_2020_proj.xlsx')
df_temp = pd.DataFrame()
df_temp['Name'] = df_si['PLAYER'].str.strip()
df_temp['si_pts'] = df_si['POINTS']

df = pd.merge(df, df_temp, on='Name', how ='outer')

# Finally, drop the players not available in Yahoo!
df = df.dropna(subset=['Draft Position'])
```

Now, I have a dataframe with all of the players and their projected fantasy scores across my various different sources, indexed on the player name.  Now for the non-parametric fun!

## Step 2 - Gaussian Kernel Density Estimation

I created a Gaussian kernel density estimation for each player using the projected points from each source (NFL, ESPN, Fantasy Sharks, etc.) for the kernels.

The following block of code generates the non-parametric estimations for each player and stores: (1) the median value from the KDE as their projected points and (2) the inverse CDF as an array in `kde_icdf` so we can generate the non-parametric confidence intervals for the draft tool.

TODO MORE CONTEXT AS TO WHY I DO THIS

TODO SOME SORT OF NOTE ABOUT HOW THIS CODE TAKES A WHILE TO RUN

```python
# create an empty column to store point projections for each player
df['pts'] = np.nan

# create an empty column to store the inverse cumulative 
# density function (icdf) data for each player's kde estimation
df['kde_icdf'] = [[] for _ in range(len(df))]

for j in range(66,len(df)):
    # model each each player with the different fantasy point estimates. 
    # This array is used for the KDE.
    test_array = []
    test_array.append(df['fp_pts'][j])
    test_array.append(df['nfl_pts'][j])
    test_array.append(df['espn_pts'][j])
    test_array.append(df['fs_pts'][j])
    test_array.append(df['si_pts'][j])
    # clean the test_array for NaN values
    test_array = [x for x in test_array if str(x) != 'nan']
    if len(test_array) == 0:
        test_array = [0]
    
    # this sets up and runs the non-parametric estimation
    kde = sm.nonparametric.KDEUnivariate(test_array)
    kde.fit(kernel='gau', bw='silverman', fft=False) # Estimate the densities

    # This for loop processes to find the median projection
    ci_50 = 0 #initialize median value to zero
    for i in range(0, len(kde.cdf)):
        if kde.cdf[i] < 0.50:
            i+=1
        if kde.cdf[i] >= 0.50:
            ci_50 = kde.support[i]
            break

    # Add data to main dataframe
    df['pts'][j]=ci_50 # add median projection
    df['kde_icdf'][j]=kde.icdf # add icdf for whisker plot construction

# export the dataset to a .csv file
df.to_csv(r'./prepared_data/2020_ffl_df.csv')
```

Below, I included an example of how the KDE estimation works for a given draft number. In the following example, `j` represents an arbitrary draft order from which we can generate a Gaussian KDE probability density function for the player corresponding to that draft rank.

The various point estimates for that player (from ESPN, SI, etc.) are indicated by the red '+'s at the bottom of the graph. What KDE does is to center a normal gaussian distribution (with area = `1/n`) for `n` point estimates) over each of these point estimates. Then, to generate the probability density function, we sum all of these "kernels" together - this summation is the orange line in the graph below.

Then, the following block of code generates a histogram from the KDE PDF showing the 1- and 2- standard deviation confidence intervals.

```python
j = 125

test_array = []
test_array.append(df['fp_pts'][j])
test_array.append(df['nfl_pts'][j])
test_array.append(df['espn_pts'][j])
test_array.append(df['fs_pts'][j])
test_array.append(df['si_pts'][j])
test_array = [x for x in test_array if str(x) != 'nan']
if len(test_array) == 0:
    test_array = [0]
    
kde = sm.nonparametric.KDEUnivariate(test_array)
kde.fit(kernel='gau', bw='silverman', fft=False)

fig = plt.figure(figsize=(10, 5))
ax = fig.add_subplot(111)

ax.hist(test_array, bins=5, density=True, label='Histogram from forecasts',
        zorder=5, edgecolor='k', alpha=0.5)
ax.plot(kde.support, kde.density, lw=3, label='KDE from projections', 
        zorder=10)
    
# Plot the samples
ax.scatter(test_array, np.abs(np.random.randn(len(test_array)))/100000,
        marker='+', color='red', zorder=20, label='Point Forecasts', 
        alpha=0.5)

ax.legend(loc='best')
ax.grid(True, zorder=-5)
```

![KDE Demo](../../../media/KDE_demo.png){:height="400px" width="760px"}

This distribution is then used to generate median point estimations and confidence intervals for each player. For example, this code

```python
box_plot_data=kde.icdf
plt.boxplot(box_plot_data, vert=False, labels=[df['Name'][j]])
plt.show()
```
generates the following confidence interval.

![CI Demo](../../../media/confidence_interval_demo.png)

## Conclusion and Further Reading

I'll expand on the user interface of DAsHA for Part Two!
