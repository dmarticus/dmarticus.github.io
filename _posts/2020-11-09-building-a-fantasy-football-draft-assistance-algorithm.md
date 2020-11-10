---
title: "Building a Fantasy Football Draft Assistance Algorithm"
layout: post
tags: [fun, data science, python]
post_summary: "Constructing a Fantasy Football draft assistance algorithm using Gaussian Kernel Density Estimation (Gaussian KDE)."
---

# 2020 Fantasy Football

## Part 1: Import the Data and Convert everything to a csv

### Summary

Constructing a Fantasy Football draft assistance algorithm using Gaussian Kernel Density Estimation (Gaussian KDE). 

### Context

What is Gaussian KDE?
Why use it?
What do I expect to get out of it?

### Collecting, Cleaning, and Composing the Data

"DAsHA" Stands for Draft Assistance Heuristic Algorithm. 

Part 1: Collecting and cleaning the data

```python
import numpy as np
import pandas as pd
%matplotlib inline
from scipy import stats
import statsmodels.api as sm
import matplotlib.pyplot as plt
from statsmodels.distributions.mixture_rvs import mixture_rvs
```

First, I got the raw position data from the following sources:

```
https://fantasy.espn.com/football/players/projections?leagueFormatId=1 
https://www.fantasysharks.com/apps/Projections/SeasonProjections.php?pos=ALL 
https://www.fantasypros.com/nfl/rankings/consensus-cheatsheets.php?loggedin=&my-experts=ALL 
https://fftoolbox.fulltimefantasy.com/football/rankings/index.php?noppr=true 
https://fantasy.nfl.com/research/projections?position=O&sort=projectedPts&statCategory=projectedStats&statSeason=2020&statType=seasonProjectedStats#researchProjections=researchProjections%2C%2Fresearch%2Fprojections%253Fposition%253DO%2526statCategory%253DprojectedStats%2526statSeason%253D2020%2526statType%253DseasonProjectedStats%2526statWeek%253D1%2Creplace
```

I also got Yahoo!'s draft position list from: https://football.fantasysports.yahoo.com/f1/826195/1/editprerank

The scores and ratings from each source are all saved within this repository as individual .xlsx files

Next, I compiled and merged the data using the on player names from the Yahoo! draft list as the primary keys (since I'm going to index DAsHA on the player names)

```python
# load Yahoo! draft positions
df = pd.read_excel('Yahoo_2020_Draft_Positions.xlsx')
# strip the names so they can be directly compared to other lists
df['Name'] = df['Name'].str.strip()

# load Fantasy Pros Projections
df_fantasy_pros = pd.read_excel('Fantasy_Pros_2020_proj.xlsx')

# construct temporary data frame to merge relevant info
df_temp = pd.DataFrame()
df_temp['Name'] = df_fantasy_pros['PLAYER'].str.strip()
df_temp['fp_pts'] = df_fantasy_pros['FAN PTS']

# merge df with temporary df
df = pd.merge(df, df_temp, on='Name', how ='outer')

# import NFL projections
df_nfl = pd.read_excel('NFL_2020_proj.xlsx')
df_temp = pd.DataFrame()
df_temp['Name'] = df_nfl['PLAYER'].str.strip()
df_temp['nfl_pts'] = df_nfl['POINTS']

df = pd.merge(df, df_temp, on='Name', how ='outer')

# import ESPN projections
df_espn = pd.read_excel('ESPN_2020_proj.xlsx')

df_temp = pd.DataFrame()
df_temp['Name'] = df_espn['PLAYER'].str.strip()
df_temp['espn_pts'] = df_espn['TOT']

df = pd.merge(df, df_temp, on='Name', how ='outer')

# import Fantasy Shark projections
df_fantasy_shark = pd.read_excel('Fantasy_Shark_2020_proj.xlsx')
df_temp = pd.DataFrame()
df_temp['Name'] = df_fantasy_shark['Name'].str.strip()
df_temp['fs_pts'] = df_fantasy_shark['Fantasy Points']

df = pd.merge(df, df_temp, on='Name', how ='outer')

# import Sports Illustrated projections
df_si = pd.read_excel('Sports_Illustrated_2020_proj.xlsx')

df_temp = pd.DataFrame()
df_temp['Name'] = df_si['PLAYER'].str.strip()
df_temp['si_pts'] = df_si['POINTS']

df = pd.merge(df, df_temp, on='Name', how ='outer')

# Finally, drop the players not available in Yahoo!
df = df.dropna(subset=['Draft Position'])
```

Part 2 - Gaussian Kernel Density Estimation
Now for the non-parametric fun!

I created a Gaussian kernel density estimation for each player using the projected points from each source (NFL, ESPN, Fantasy Sharks, etc.) for the kernels.

```python
# create an empty column to store point projections for each player
df['pts'] = np.nan

# create an empty column to store the inverse cumulative 
# density function data for each player's kde estimation
df['kde_icdf'] = [[] for _ in range(len(df))]
```

The following block of code generates the non-parametric estimations for each player and stores: (1) the median value from the KDE as their projected points and (2) the inverse CDF as an array in kde_icdf so we can generate the non-parametric confidence intervals for the draft tool.

This might take a minute or two to run. I can't be bothered to speed it up.

```python
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

# export dataset to .csv file so we don't have to get all the data again
df.to_csv(r'path/to/data.csv')
```

Below, I included an example of how the KDE estimation works. `j` represents an arbitrary draft from which we can generate a Gaussian KDE probability density function for the player corresponding to that draft rank.

The various point estimates for that player (from ESPN, SI, ets.) are indicated by the red '+'s at the bottom of the graph. What KDE does is to center a normal gaussian distribution (with area =  
1
n
  for n point estimates) over each of thes point estimates. Then, to generate the probabilty density function, we sum all of these "kernels" together - this summation is the orange line in the graph below.

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
ax.scatter(
    test_array, 
    np.abs(np.random.randn(len(test_array)))/100000,
    marker='+', 
    color='red', 
    zorder=20, 
    label='Point Forecasts', 
    alpha=0.5
)
ax.legend(loc='best')
ax.grid(True, zorder=-5)
```

![KDE Demo](../../../media/KDE_demo.png)

This distribution is then used to generate median point estimations and confidence intervals for each player. For example, this code generates the following confidence interval.

```python
box_plot_data=kde.icdf
plt.boxplot(box_plot_data, vert=False, labels=[df['Name'][j]])
plt.show()
```

![CI Demo](../../../media/confidence_interval_demo.png)

## Part 2: Create a UI to use during the draft to help with picks

The second notebook, "2020 Fantasy Football DAsHA user interface," provides a user-interface that you can use during a fantasy football draft to optimize your draft choices.

The idea here is that DAsHA will return a panel of players at each position with the highest projected points. DAsHA will also show a "marginal" score, which is how many more points this player is expected to generate compared to the best player at the same position who will be available in the next round. 

For example, if the top RB available now is projected to get 150 points, but the top RB that will be available during your next pick is projected to get 100 points, the marginal score will be 50. However, if the top kicker available this round will also be available next round, the marginal score for drafting that kicker will be 0. In general, you should draft the player with the highest marginal score. DAsHA will also return a chart of confidence intervals of each player in the panel generated above. This lets you select based on variance as well as projected points.

Finally, DAsHa generates graphs comparing the players at the two positions with the highest point projections to the next best option available at that position in the current round. This again is so that you can make an informed decision based on the variance / distribution of point projections in addition to the raw point totals. For example, the tails on either side show upside / downside potential. Depending on your draft position, you may be willing to accept a player with a lower median projection but higher upside as opposed to locking in a player with a higher median point projection, but very low variance.

An example of DAsHA's menu output is:

![alt text](../../../media/UI_demo.PNG)
