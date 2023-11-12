# Interpretability

Models are interpretable if their operations can be understood by a human, either through introspection or through a produced explanation

## Model interpretation methods

### Post hoc

* Treat models as black boxes
* Agnostic to model architecture
* Extracts relationships btwn features and model predictions, agnostic of model architecture
* Applied after training

### Types of results produced by interpretation methods

* Feature summary statistics
* Feature summary viz
* Model internals
* Data points

### Model specific or Model agnostic

Model specific
* Tools are limited to specific model classes
* Exmaple: Interpretation of regression weights in linear models
* Intrinsically interpretable model techniques are model specific
* Tools designed for particular model architectures

Model Agnostic
* Applied to any model after it is trained
* Do not have access to the internals of the model
* Work by analyzing feature input and output pairs

### Local or Global

* Local: interpretation method explains an indv prediction
* Feature attribution is identification of relevant features as an explanation for a model
* Global: interpretation method explains entire model behaviour
* Feature attribution summary for entire test data set

## Intrinsically interpretable models

* How the model works is self evident
* Classic models are highly interpretable
* Neural networks look like "black boxes"

Monotonicity improves interpretability - contribution of the feature to the result consistently inc/dec/constant even as feature value changes

## Feature importance

* Relevance of a given feature to generate model results
* Calculation is model dependent
* Eg: Linear reg model, t-statistic

## Advanced models: TF Lattice

* Overlaps a grid onto feature space and learns values for the outputs at the vertices of the grid
* Linearly interpolates from the lattice values surrounding a point
* Inject domain knowledge into the learning process
* Set constraints such as monotonicity, convexity and how features interact

-> Bad for high dimensionality

# Understanding model predictions

## Model agnostic methods

* Separate explanations from the ML model
* Req model, explanation and representation flexibility

## Partial dependence plots

* Show marginal effect one or two features have on the model result
* Whether the r/s btwn the targets and the feature is linear, monotonic or more complex
* Advantages: computation is intuitive, easy to implement, works well if no feature correlations
* Disadv: Max num of features is 2, PDP assumes feature values are no correlated

## Permutation feature importance

* Measures the inc in prediction error after permuting the feature

How it's done:
1. Estimate original model error
2. For each feature
- permute the feature value in the data to break association w/ true outcome
- est error based on the predictions of the permuted data
- calc permutation feature impt
- sort features by desc feature impt

Adv:
* Nice interpretation: Shows inc in model error when feature info is destroyed
* Provides global insight to model behaviour
* Does not req retraining of model

Disadv:
* Unclear if testing or training data should be used for viz
* Correlation affects accuracy

## Shapley values

* Game theory based approach
* Explain the diff between the actual prediction and the avg prediction by assigning each feature (which contributed to the actual prediction) a contribution to the difference
* Based on solid theoretical foundation: satisfies efficiency, symmetry, dummy and additivity properties
* Value is fairly distributed among all features
* Enables contrastive explanation

## SHAP
* Framework for Shapley values which assigns each feature an importance value for a particular prediction
* Shapley values can be visualized as forces
* Predictions starts from the baseline (avg of all predictions)
* Each feature value is a force that inc or dec the prediction

## LIME - Local interpretable Model-agnostic Explanations

* Implements local surrogate models - interpretable models that are used to explain indv predictions
* Using data points close to the indv prediction, LIME trains an interpretable model to approximate the predictions of the real model
* THe new interpretable model is then used to interpret the real result