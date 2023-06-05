# Data journey and data storage

## Data journey

How data transforms from raw data to predictions  
Use tracking such as artifacts, metadata, data provenance and lineage to track data as it gets transformed

## ML metadata

- Data validation and Data transformation interact with the ML metadata store  
- ML metadata library tracks metadata flowing between components in the pipeline
- 3 units
- - Artifact: Data going as input or generated as output by a component
- - Execution: Record of component in the pipeline
- - Context: Conceptual grouping of executions and artifacts

# Evolving data

Data schema - Have a schema to ensure data is validated and errors are recognized easily

# Enterprise Data storage

## Feature stores
Feature stores - Central repository for documented, curated and access controlled data  
Enables teams to share, discover and use highly curated features  
Offline feature processing
* run -> ingest -> publish
* data quality checks 
* discoverability
