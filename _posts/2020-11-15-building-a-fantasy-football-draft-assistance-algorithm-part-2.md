---
title: "Building a Fantasy Football Draft Assistance Algorithm: Part Two"
layout: post
tags: [fun, data science, python]
post_summary: "Constructing a Fantasy Football draft assistance algorithm using Gaussian Kernel Density Estimation (Gaussian KDE) Part Two: Building the User Interface."
---

### Part Two -- building the user interface to run alongside the draft

## Background

## User Interface

## Running the Draft

The second notebook, "DAsHA_user_interface" provides a user-interface that you can use during a fantasy football draft to optimize your draft choices.

The idea here is that DAsHA will return a panel of players at each position with the highest projected points. DAsHA will also show a "marginal" score, which is how many more points this player is expected to generate compared to the best player at the same position who will be available in the next round.

For example, if the top RB available now is projected to get 150 points, but the top RB that will be available during your next pick is projected to get 100 points, the marginal score will be 50. However, if the top kicker available this round will also be available next round, the marginal score for drafting that kicker will be 0. In general, you should draft the player with the highest marginal score.

DAsHA will also return a chart of confidence intervals of each player in the panel generated above. This lets you select based on variance as well as projected points.

Finally, DAsHa generates graphs comparing the players at the two positions with the highest point projections to the next best option available at that position in the current round. This again is so that you can make an informed decision based on the variance / distribution of point projections in addition to the raw point totals. For example, the tails on either side show upside / downside potential. Depending on your draft position, you may be willing to accept a player with a lower median projection but higher upside as opposed to locking in a player with a higher median point projection, but very low variance.

An example of DAsHA's menu output is:

![UI Demo](../../../media//UI_demo.PNG)

And here's how it works with me running the demo live:

![DAsHA Demo](../../../media/DAsHA_Demo.gif){:height="650px" width="700px"}
