# Hyperparameter Tuning

### Neural Architecture Search

- Techinique for automating design of neural networks
- Helps find optimal architecture
- Search over a huge space
- AutoML is an algo to automate this search

### Types of parameters

- Trainable parameters
- - Learned by algo during training eg: weights of NN
- Hyperparameters
- - set b4 launching learning process
- - not updated in each training step eg: no of units in dense layer

>> Manual hyperparameter tuning is not scalable

## AutoML

- Automates the entire ML workflow

## NAS

- Search strategy - how to explore the search space
- Objective: Find architectures that perform well on our data

- AutoML automates the dev of ML models
- AutoML is not specific to a particular type of model
- NAS is a subfield of AutoML
- NAS is a technique for automating the design of ANN

## Search spaces

- Macro
- - Builds neural network from layers
- - Contains indv layers and connection types
- Micro
- - Builds neural network from cells (a smaller network)
- - Cells are stacked to form a network

## Search strategies
1. Grid Search / Random search
- Exhaustive search approach on fixed grid values
- Fails on big search space
2. Bayesian Optimization
- Assumes a specific prob dist is underlying the performance
- Tested architectures constrain the prob dist and guide the selection of the next option
- Promising architectures can be stochastically determined and tested
3. Evolutionary methods
- Initial popn of N architectures are evaluated
- X highest performers are selected (parents)
- Parents are modified (offspring) with operations like add/remove/multiply
- Low performers are discarded and cycle repeats
4. Reinforment Learning
- Agents goal is to maximise a reward
- The avail opts are selected from the search space
- Performance estimation strat defines the reward

## Performance Estimation Strategy
- Validation accuracy
- - Computational heavy
- - Time consuming + Expensive

### Strategies to reduce costs
1. Lower Fidelity Estimates
- Reduce training time by data subset, low resolution images, fewer filters and cells
- Reduce costs but underestimates performance
2. Learning curse extrapolation
- Req predicted the learning curse reliably
- Extrapolates based on initial learning
- Removes poor performers
3. Weight inheritance
- Initialize weights of new architectures based on prev trained architectures
- Uses Network morphism - Underyling func unchanged, new network inherits knowledge from parent network