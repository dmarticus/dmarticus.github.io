---
title: "Building a Fantasy Football Draft Assistance Algorithm: Part Two"
layout: post
tags: [fun, data science, python]
post_summary: "Constructing a Fantasy Football draft assistance algorithm using Gaussian Kernel Density Estimation (Gaussian KDE) Part Two: Building the User Interface."
---

### Part Two -- building the user interface to run alongside the draft

Now that I had my `.csv` file full of players and their projections, I now wanted to turn this data into DAsHA proper -- I wanted a tool that could take (a) the draft order and (b) players already picked as inputs and return the best possible players per position.  Here's how I went about doing that.

For starters, I had to do a little bit of data cleanup so that the player scores were displaye in a user-friend way.  I also had to import all the necessary libraries to run my model.  Enter my second Jupyter Notebook!

```python
import numpy as np
import pandas as pd
%matplotlib inline
from scipy import stats
import statsmodels.api as sm
import matplotlib.pyplot as plt
from statsmodels.distributions.mixture_rvs import mixture_rvs

# import the csv file
df = pd.read_csv('./prepared_data/2020_ffl_df.csv')

# clean up the kde_icdf column
for i in range(0,len(df)):
    df['kde_icdf'][i] = df['kde_icdf'][i].replace('\n',' ').replace('[','').replace(']','')
    df['kde_icdf'][i] = [float(x) for x in df['kde_icdf'][i].split()]
    
# more data cleanup for the position names
df['POS']=df['POS'].str.strip()

# add drafted column to track drafted players
df['drafted']=0
```

Now that my data was ready, it was time to create DAsHA, the algorithm for determining the best player from the given remaining ones.

The idea here is that DAsHA will return a panel of players at each position with the highest projected points. DAsHA will also show a "marginal" score, which is how many more points this player is expected to generate compared to the best player at the same position who will be available in the next round.

Here's how I compared the best players:

```python
def compare_best_players(positions):
    # identify best players per position
    best_players = []
    j = 0
    for j in range(0, len(positions)):
        k = 0
        for k in range(0, len(df)):
            if df['drafted'][k] == 1:
                k += 1
            if df['drafted'][k] == 0:
                if df['POS'][k] == positions[j]:
                    if len(best_players) > j:
                        if df['pts'][k] > best_players[j][2]:
                            best_players[j] = [df['POS'][k], df['Name'][k], df['pts'][k], df['Draft Position'][k]]
                            k += 1
                        if df['pts'][k] <= best_players[j][2]:
                            k += 1
                    if len(best_players)<=j:
                        best_players.append([df['POS'][k], df['Name'][k], df['pts'][k],df['Draft Position'][k]])
                        k += 1

    return best_players
```

Then, I needed to compare the _second_ best players:

```python
def compare_second_best_players(positions, best_players):
    # loop to collect second-best choices for each round
    second_best_players = []
    j = 0
    for j in range(0,len(positions)):
        k = 0
        for k in range(0,len(df)):
            if df['drafted'][k] == 1:
                k += 1
            if df['drafted'][k] == 0:
                if df['POS'][k] == positions[j]:
                    if len(second_best_players) > j:
                        if df['Name'][k] == best_players[j][1]:
                            k += 1
                        else:
                            if df['pts'][k] > second_best_players[j][2]:
                                second_best_players[j]=[df['POS'][k], df['Name'][k], df['pts'][k], df['Draft Position'][k]]
                                k += 1
                            if df['pts'][k] <= second_best_players[j][2]:
                                k += 1
                    if len(second_best_players) <= j:
                        if df['Name'][k] == best_players[j][1]:
                            k += 1
                        else:
                            second_best_players.append([df['POS'][k], df['Name'][k], df['pts'][k], df['Draft Position'][k]])
                            k += 1
    return second_best_players
```

Finally, I wanted to get the list of the best players for the next round so I could calculate the _marginal_ score.

```python
def compare_best_players_next_round(positions, next_available_pick):
    # identify best choice in next round at each position
    best_players_next_round = []
    j = 0
    for j in range(0, len(positions)):
        k = 0
        for k in range(0, len(df)):
            if df['drafted'][k] == 1:
                k += 1
            if df['drafted'][k] == 0:
                if df['POS'][k] == positions[j]:
                    if len(best_players_next_round) > j:
                        if df['Draft Position'][k] < next_available_pick:
                            k += 1
                        else:
                            if df['pts'][k] > best_players_next_round[j][2]:
                                best_players_next_round[j] = [df['POS'][k], df['Name'][k], df['pts'][k], df['Draft Position'][k]]
                                k += 1
                            if df['pts'][k] <= best_players_next_round[j][2]:
                                k += 1
                    if len(best_players_next_round) <= j:
                        if df['Draft Position'][k] < next_available_pick:
                            k += 1
                        else:
                            best_players_next_round.append([df['POS'][k], df['Name'][k], df['pts'][k], df['Draft Position'][k]])
                            k += 1

    return best_players_next_round
```

Tying everything together, my calculations looked like this:

```python
current_draft_number = 0
i = 0
while current_draft_number == 0:
    if df['drafted'][i] == 1:
        i += 1
    else:
        current_draft_number = df['Draft Position'][i]

# threshold for next available picks
next_available_pick = current_draft_number + turns_to_next_pick

# List of possible positions to draft for
positions = ['QB','RB','WR','TE','K','DEF']

# identify best choices at each position
best_players = compare_best_players(positions)

# identify best choice in next round at each position
best_players_next_round = compare_best_players_next_round(positions, next_available_pick)

# collect the second-best choices for each round
second_best_players = compare_second_best_players(positions, best_players)
```

Then, I calculated the marginal examples

```python
# make marginal comparison and append to best_players list
for j in range(0,len(positions)):
    marg = best_players[j][2] - best_players_next_round[j][2]
    best_players[j].append(marg)
```

Finally, it's time to start visualizing the data!  Since I wanted the most important information to help me draft first (I only have 90 seconds per round), I started with my recommendations:

```python
# print recommendation menu
for i in range(0,len(positions)):
    print(f"{best_players[i][0]:{5}} - {best_players[i][1]:{20}} - {round(best_players[i][2],2):{6}}, margin: {round(best_players[i][4],2)}")
```

Then I visualized the actual spread of the best players, broken out by position.

```python
# finding index values (based off Yahoo! draft position) to create the boxplots
DEF = best_players[0][3] - 1
K = best_players[1][3] - 1
TE = best_players[2][3] - 1
WR = best_players[3][3] - 1
RB = best_players[4][3] - 1
QB = best_players[5][3] - 1

# boxplots of recs
box_plot_data=[df['kde_icdf'][QB], df['kde_icdf'][RB], df['kde_icdf'][WR], df['kde_icdf'][TE], df['kde_icdf'][K], df['kde_icdf'][DEF]]
plt.boxplot(box_plot_data, vert=False, labels=[df['Name'][QB], df['Name'][RB], df['Name'][WR], df['Name'][TE], df['Name'][K], df['Name'][DEF] ])
plt.show()
```

Finally, I calculated the second-best player by position and visualized that data, too (mostly to just give myself the option)

```python
# find top two second-best
top_seconds = [second_best_players[0][2], second_best_players[1][2], second_best_players[2][2], second_best_players[3][2],second_best_players[4][2],second_best_players[5][2],]

first_comparison = top_seconds.index(max(top_seconds))
top_seconds[first_comparison] = 0
second_comparison = top_seconds.index(max(top_seconds))

# boxplots of second best
first_best_first = best_players[first_comparison][3] - 1
second_best_first = second_best_players[first_comparison][3] - 1
first_best_second = best_players[second_comparison][3] - 1
second_best_second = second_best_players[second_comparison][3] - 1

box_plot_data=[df['kde_icdf'][second_best_first], df['kde_icdf'][first_best_first]]
plt.boxplot(box_plot_data, vert=False, labels=[df['Name'][second_best_first], df['Name'][first_best_first]])
plt.show()

box_plot_data=[df['kde_icdf'][second_best_second], df['kde_icdf'][first_best_second]]
plt.boxplot(box_plot_data, vert=False, labels=[df['Name'][second_best_second], df['Name'][first_best_second]])
plt.show()
```

(TODO SHOW GRAPH)

For example, if the top RB available now is projected to get 150 points, but the top RB that will be available during your next pick is projected to get 100 points, the marginal score will be 50. However, if the top kicker available this round will also be available next round, the marginal score for drafting that kicker will be 0. ***In general, you should draft the player with the highest marginal score.***

DAsHA will also return a chart of confidence intervals of each player. This lets you select based on variance as well as projected points.

Finally, DAsHa generates graphs comparing the players at the two positions with the highest point projections to the next best option available at that position in the current round. Again, DAsHA is a _helper_ tool, so my goal was to provide as much data for myself to make an informed decision based on the variance / distribution of point projections in addition to the raw point totals. For example, the tails on either side show upside / downside potential (TODO SHOW GRAPH). Depending on your draft position, you may be willing to accept a player with a lower median projection but higher upside as opposed to locking in a player with a higher median point projection, but very low variance.

An example of DAsHA's menu output is:

![UI Demo](../../../media//UI_demo.PNG)

Finally, I built a little while loop so I could run DAsHA live and feed it inputs while my draft was going:

```python
your_turn = False
while your_turn == False:
    new_draft = input('Who was the last pick?')
    if new_draft != '':
        temp_index = df['Name'].str.find(str(new_draft.strip()))
        temp_no = temp_index.values.argmax()
        df['drafted'][temp_no] = 1
        new_draft = ''
    your_turn_input = input('Is it your turn?')
    no_set = {'no', 'n', 'N', 'No'}   
    if your_turn_input in no_set: 
        your_turn = False
    else:
        your_turn = True
```

Here's what it looked like while I was drafting!

![DAsHA Demo](../../../media/DAsHA_Demo.gif){:height="650px" width="700px"}
