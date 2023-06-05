# Model analysis overview

## Model performance analysis

### What is next after model training/deployment?

- Is model performing well?
- Is there scope for impv?
- Can data change in future
- Has data changed since you created the training dataset

### Black box vs model introspection

- Models can be tested for metrics like accuracy and losses like test error w/o knowing internal details
- For finer eval, models can be inspected part by part

### Performance metrics vs optimization objectives

- Performance metrics will vary based on the task like regression, classification etc
- Within a type of task, based on your end-goal, your performance metrics may be diff
- Performance is measured after a round of optimization

- Machine learning formulates the problem statement into an objective func
- learned algos find optimum values for each variable to converge into local/global minima

## Advanced model analysis and debugging

Tensorflow Model analysis

## Model robustness
- More than generalization
- Is model accurate even for slightly corrupted input data

### Robustness metrics
- Shouldn't take place during training
- Use test set
- Specific metrics for regression/classification

### Model debugging
- Detecting and dealing prob with ML sys
- Applies mainstream soft eng practices to ML model

### Objectives
- Inc transparency of models
- Reduce social discrimination, security vulnerabilities, privary concerns

### Techniques
- Benchmark models
- - Small trusted and interpretable models solving the same problem
- - Compare ML model against these models
- Sensitivity analysis and adversarial attacks
- - Simulate data of your choice and see what your model predicts
- - See how model reacts to data never seen before
- - Partial dependence plots -> visualize the effects of changing on or more variables
- - Cleverhans: open soruce python lib to benchmark ML sys vulnerability to adversarial examples, another one is foolbox
- - Defensive distillation against adversarial examples
- Residual analysis
- - Measures diff betwen model's predictions and ground truth
- - Randomly distributed errors are good
- - Correlated errors are bad
- - Residuals should not be correlated with another feature
- - Adjacent residuals should not be correlated with each other

## Model remediation

### Techniques
- Data augmentation
- Interpretable and explainable ML
- Model editing: Applies to decision trees
- Model assertions: implement busness rules that override model predictions
- Discrimination remediation: include ppl with varied backgrounds, conduct feature selection and use fairness metrics to select hyperparameters
- Model monitoring - conduct model debugging freq, inspect accuracy, fairness and security probs
- Anomaly derection - enforce data integrity constrains

## Continuous evaluation and monitoring

- Training data is a snapshot of the word at a point in time
- Many types of data change over time
- ML models do not get better with age
- As model performance degrades you want an early warning

### Data drift and shift
- Concept drift: Loss of prediction quality eg: changing fashion trends
- Concept emergence: new type of data distribution
- Types of dataset shift:
- - covariate shift
- - prior probability shift

### Statistical process control
- Method used is drift detection model
- Models num of error as binomial random variable
### Sequential analysis
- method used is linear four rates
- if data is stationary, contingency table should remain constant
### Error dist monitoring
- method used is adaptive windowing
- calc mean error rate at every window of data
- size of windows adapts, becoming shorted when data is not stationary

### Clustering/Novelty detection
- Assign data to known cluster or detect emering concept
- Algos: OLINDDA< MINAS< ECSMINER and GC3
- susceptible to curse of dimensionality

### Feature distribution monitoring
- Monitors indv feature separately at every window of data
- Pearson correlation in change of concept
- Hellinger dist
- use PCA to reduce num features

### Model dependent monitoring
- Concerate efforts near decision margin in latent space
- Margin Density Drift Detection (MDDD)
- Area in latent space where classifier have low confidence matters more
- Reduces false alarm
