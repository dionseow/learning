# Define data and establish baseline

## Why is data definition hard?

Label ambiguity/inconsistency across different labellers

Eg:
- Um, nearest gas station vs Umm..., nearest gas station

## Major types of data problems

Small data (< 10,000 examples)
- Clean labels are critical
- Can manually look through dataset and fix labels
- Can get all labellers to talk to each other
Big data (>10,000 examples)
- Emphasis on data process


## Improving label consistency

- Have multiple labellers label same exmaples
- When there is disagreement, have MLE, subject matter expert or labellers discuss definition of y to reach agreement
- If labellers believe that x doesnt contain enough info, consider changing x
- Iterate until it is hard to significantly increase agreement
- Have a class/label for ambigious points (eg: unintelligible audio)

### Small data vs big data

Small data
- usually small num of labellers
- can ask labelelrs to discuss specific labels

Big data  
- get to consistent definition with a small grp
- then send labelling instructions to labellers
- can consider having multiple labellers label every example and use voting to inc accuracy

## Human level performance
Why measure HLP - estimate Bayes error/ irreducible error to help with error analysis and prioritization

## Other uses of HLP
- In academia, establish and beat a respectable benchmark to support publication
- Business or product owner asks for 99% accuracy. HLP helps establish a more reasonable target

## Raising HLP
- When the label y comes from a human label, HLP << 100% may indicate ambiguous labeling instructions
- Improving label consistency will raise HLP
- This makes it harder for ML to beat HLP. But more consistent labels will raise ML performance which is ultimately likely to benefit the actual app performance

# Label and organize data

## Obtaining data
How long should you spend obtaining data  
A: ASAP. Get into the training loop as soon as you can

### Labeling data
- Options: in-house vs oursourced vs crowdsourced
- Having MLEs label data is expensive. But doing this for just a few days is usually fine
- Who is qualified to label? - Depends on task, whether it's specialised or not
- Don't increase data by more than 10x at a time during training loop

## Data pipeline

POC
- Goal is to decide if the application is workable and worth deploying
- Focus on getting the prototype to work
- It's ok if data pre-processing is manual. But take extensive notes/comments

Production
- After project utility is establish, use more sophisticated tools to make sure data pipeline is replicable

## Meta-data, data provenance and lineage

Data provenance - where it came from  
Lineage - sequence of steps needed to get to the end of the pipeline
Meta data - Data about the data

>> Useful for
- Error analysis, spotting unexpected effects
- Keeping track of data provenance

# Scoping

Questions:
- What projects should we work on
- What are the metrics for success
- What are the resources (data, time, people) needed

## Scoping process

- Brainstorm business problems (not AI problems)
- Brainstorm AI solutions
- Assess the feasibility and value of potential solutions
- Determine milestones
- Budget for resources

## Diligence on feasibility and value

- Use external benchmark (literature, other company, competitor)

### Why use HLP to benchmark
- People are very good on unstructured data tasks
- Criteria: Can a human, given the same data, perform the task?

### Do we have features that are predictive

## Diligence on value

- Check the MLE metrics with the business metrics
- Have the technical and business teams try to agree on metrics that both are comfortable with

## Milestones and resourcing

Key specifications
- ML metrics (accuracy, precision/recall)
- Software metrics (latency, throughput)
- Business metrics (revenue)
- Resources needed
- Timeline
If unsure, consider benchmarking to other projects or building a POC first