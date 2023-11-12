# Selecting and training a model
Model centric - focusing on the ML model  
Data centric - focusing on feeding high quality data to model

>> Recommended to focus on  data centric method to improve modelling
## Key challenges

AI system = Code + Data  
Model dev is an iterative process  
- Model + Hyperparameters + data
- Training
- Error analysis

### Challenges in Model development
1. Doing well on training set
2. Doing well on dev/test sets
3. Doing well on business metrics/project goals

## Why low average error isn't good enough

### Performance on disproportionately important examples  
Eg for web search:
- Informational and transactional queries (more forgiving to mess up)
- Navigation queries (should not mess up at all)
### Performance on key slices of dataset
Eg ML for loan approval
- Not to discriminate by ethnicity, gender, location, language etc
Eg Product recommendations from retailers
- Treat fairly for all major users, retailers and product categories
### Rare classes
Skewed data distribution - 99% negative, 1% positive

>> Solve business needs

## Establish a baseline
- Check the human level performance for the same task to decide which areas to improve for the model and as a comparison
- HLP tends to be a better gauge for unstructured data than structured data
### Ways to establish a baseline
1. Human level performance
2. Literature search for state-of-the-art/open source
3. Quick and dirty implementation
4. Performance of older system

Baseline helps to indicate what miught be possible  
In some cases, it also gives a sense of what is irreducible error/Bayes error

## Tips for getting started
Iterative process, fail fast and quick

### Getting started on modeling
- Literature search to see what's possible
- Find open source implementations
- A reasonable algo with good data will often outperform a great algo with not so good data

### Deployment constraints when picking a model
- Should you take into account deployment constraints when picking a model?
- - Yes, if baseline is already established and goal is to build and deploy
- - No, if purpose is to establish a baseline and determine what is possible and might be worth pursuing
### Sanity-check for code and algorithm
- Try to overfit a small training dataset before training on a large one

# Error analysis and performance auditing

## Error analysis example
Brainstorm different tags which caused the model to underperform eg: Car noise, People noise
Iterative process of error analysis
- Examine/tag examples
- Propose tags

### Visual inspection example
- Specific class labels: Scratch dents
- Image properties: Blurry, dark background, reflection
- Other meta-data: Phone model, factory

### Useful metrics for each tag
- What fraction of errors has that tag?
- Of all data with that tag, what fraction is misclassified
- What fraction of all the data has that tag
- How much room for improvement is there on data with that tag

## Prioritizing what to work on
Select based on which is most imporant to you:
- How much room for improvement there is
- How frequently that category appears
- How easy is to improve accuracy in that category
- How important it is to improve in that category

### Adding/improving data for specific categories
For that category you want to prioritize:
- Collect more data
- Use data augmentation
- Improve label accuracy/data quality

## Skewed datasets
Prioritize based on:
- Confusion matric: Precision, Recall and F1
- Multi-class metrics
- - Classes: Scratch, Dent, Pit mark, Discoloration
- - Check precision, recall and F1 for each of these classes

## Performance auditing
Before pushing to production, perform last mile performance audits  

Check for accuracy, fairness/bias and other problems
1. Brainstorm the ways the system might go wrong.
- - Performance on subsets of data (eg: gender, ethnicity)
- - How common are certain errors (eg: FP, FN)
- - Performance on rare classes
2. Establish metrics to assess performance against these issues on appropriate slices of data
3. Get business/product owner buy-in

### Speec recognition example
1. Brainstorm the ways the system might go wrong
- - Accuracy on different genders and ethnicities
- - Accuracy on different devices
- - Prevalence of rude mis-transcriptions
2. Establish metrics to assess performance against these issues on appropriate slices of data.
- - Mean accuracy for different genders and major accents
- - Mean accuracy on diff devices
- - Check for prevalence of offensive words in the output


# Data iteration

## Data-centric AI development
Model centric view
- Take the data you have and develop a model that does as well as possible on it
- Hold the data fixed and iteratively improve the code/model
Data-centric view
- The quality of the data is paramount. Use tools to improve data quality. This will allow multiple models to do well
- Hold the code fixed and iteratively improve the data

## Data augmentation
Goal:  
Create realistic examples that (i) the algorithm does poorly on, but (ii) humans (or other baseline) do well on
Checklist:
- Does it sound realistic?
- Is the x -> y mapping clear? (eg: can humans recognize speech?)
- Is the algo currently doing poorly on it

## Can adding data hurt?

For unstructed data problems if:
- The model is large(low bias).
- The mapping x -> y is clear (eg: given only the input x, humans can make accurate predictions)
>> Then, adding data rarely hurts accuracy


## Adding features

Eg: Restaurant recommendation example  
Vegetarians frequently recommended restaurants with only meat options.  
Possible features to add?
- Is person vegetarians (based on past orders)?
- Does restaurant have vegetarians options (based on menu)?
Oteh features that can help make decisions
- Collaborative filtering
- Content based filtering

### Data iteration

- Error analysis can be harder if there is no good baseline (such as HLP) to compare to
- Error analysis, user feedback and benchmarking to competitors can all provide inspiration for features to add

## Experiment tracking

What to track:
- Algo/code versioning
- Dataset used
- Hyperparameters
- Results

Desirable features
- Info needed to replicate results
- Experiment results, ideally with summary metrics/analysis
- Resource monitoring, visualization, model error analysis

## From big data to good data

Try to ensure consistently high quality data in all phases of the ML project lifecycle

Good data:
- Covers important cases (good coverage of inputs x)
- Is defined consistently (definitions of labels y is unambigious)
- Has timely feedback from production data (distribution covers data drift and concept drift)
- Is sized appropriately

# Assignment
https://colab.research.google.com/github/https-deeplearning-ai/MLEP-public/blob/main/course1/week2-ungraded-lab/C1W2_Ungraded_Lab_Birds_Cats_Dogs.ipynb