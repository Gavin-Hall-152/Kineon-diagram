# Dim_FY_Began

## Purpose
This dimension table provides fiscal year reference data for when learning activities begin. It enables consistent fiscal year-based analysis of learning initiation patterns, supporting standardized reporting and trend analysis across the learning platform.

## Key Features
- Defines fiscal year boundaries
- Provides standardized year references
- Supports temporal analysis
- Enables fiscal reporting
- Maintains consistent date handling
- Facilitates trend analysis

## Source Tables and Mappings

### Static Values (2012-2036)
    FY_Began --> Year string              # Fiscal year identifier
    FYStartDate --> January 1st of year   # Fiscal year start date
    FYEndDate --> December 31st of year   # Fiscal year end date

## Common Queries
- Fiscal year enrollment patterns
- Year-over-year comparisons
- Start date distributions
- Seasonal trend analysis
- Annual planning metrics
- Period-based reporting
- Temporal pattern analysis

## Related Tables
- Fact_Course_Progress: For course starts
- Fact_Program_Progress: For program starts
- Fact_Certification_Progress: For certification starts
- Fact_Course_History: For historical analysis
- Fact_Program_History: For program history
- Fact_Certification_History: For certification history

## Notes
- Covers fiscal years from 2012 to 2036
- Uses calendar year alignment
- Supports multiple fact tables
- Enables consistent reporting
- Facilitates trend analysis
- Maintains date standardization

## Fiscal Year Structure
- Start: January 1st
- End: December 31st
- Duration: 12 months
- Format: YYYY
- Range: 25 years
- Granularity: Annual

## Usage Patterns
Applied to:
- Course enrollments
- Program assignments
- Certification starts
- Learning initiatives
- Compliance tracking
- Historical analysis

## Analysis Capabilities
Enables analysis of:
- Start date patterns
- Annual trends
- Seasonal variations
- Year comparisons
- Period metrics
- Temporal distributions

## Reporting Functions
Supports:
- Annual reporting
- Fiscal compliance
- Trend analysis
- Period comparisons
- Historical tracking
- Future planning

## Date Handling
- Consistent date formatting
- Standard year boundaries
- Clear period definitions
- Temporal aggregation
- Date range validation
- Period calculations 