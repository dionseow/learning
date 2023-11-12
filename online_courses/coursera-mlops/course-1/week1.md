# The machine learning project lifecycle
## Steps of an ML project

1. Scoping
- Define project
2. Data
- Define data and establish baseline
- Label and organize data
3. Modelling
- Select and train model
- Perform error analysis
4. Deployment
- Deploy in production
- Monitor and maintain system

# Deployment

## Key challenges

### Concept drift and data drift

1. Concept drift
- What is y given x changes
- Eg: Housing price (y) raised across the board despite features being the same
2. Data drift
- X changes
- Eg: Credit card fraud, more people using credit cards due to COVID

### Software eng issues
Checklist of questions
1. Realtime or batch
2. Cloud vs Edge/Browser
3. Compute resources (CPU/GPU/Memory)
4. Latency, throughput(QPS)
5. Logging
6. Security and Privacy


## Deployment patterns

### Common deployment cases

1. New product/capability
2. Automate/assist with manual task
3. Replace previous ML system

Key ideas:
- Gradual ramp up with monitoring
- Rollback

### Shadow mode deployment
- ML system shadows the human and runs in parallel
- ML system's output not used for any decisions
- Gather data of how human compares against ML
### Canary deployment
- Roll out to small fraction of traffic initially
- Monitor system and ramp up traffic gradually
- Spot problems early on
### Blue green deployment
- Old (Blue) version and New (Green) version
- Router sends requests to Blue version but changes to green
- Allows for easy rollback

### Degrees of automation
1. Human only
2. Shadow mode
3. AI assistance (AI helps to flag out)
4. Partial automation (allow human to label if AI is unsure)
5. Full automation

## Monitoring

1. Brainstorm all the things that could go wrong
2. Brainstorm a few statistics/metrics that will detect the problem
3. OK to use many metrics initially and remove those as time goes out
4. Set thresholds for alarm
5. Adapt metrics and thresholds over time
6. Automatic / Manual retraining

### Examples to track
1. Software metrics - memory, compute, latency, throughput, server load
2. Input metrics - Avg input length, Avg input volume, Num missing values, Avg img brightness
3. Output metrics - # times return null, # times user redoes search, # times switches to typing, CTR

# Assignment

https://github.com/https-deeplearning-ai/machine-learning-engineering-for-production-public/tree/main/course1/week1-ungraded-lab



