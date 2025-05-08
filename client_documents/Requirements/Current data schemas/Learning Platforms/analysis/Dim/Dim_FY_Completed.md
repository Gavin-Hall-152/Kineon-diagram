# Dim_FY_Completed

## Purpose
This dimension table provides fiscal year reference data for when learning activities are completed. It enables consistent fiscal year-based analysis of completion patterns, supporting standardized reporting and achievement analysis across the learning platform.

## Key Features
- Defines fiscal year boundaries
- Provides standardized year references
- Supports completion analysis
- Enables achievement reporting
- Maintains consistent date handling
- Facilitates success metrics

## Source Tables and Mappings

### Static Values (2012-2036)
    FY_Completed --> Year string          # Fiscal year identifier
    FYStartDate --> January 1st of year   # Fiscal year start date
    FYEndDate --> December 31st of year   # Fiscal year end date

## Common Queries
- Fiscal year completion rates
- Achievement timing patterns
- Success rate analysis
- Completion trend analysis
- Annual performance metrics
- Period-based reporting
- Success pattern analysis

## Related Tables
- Fact_Course_Progress: For course completions
- Fact_Program_Progress: For program completions
- Fact_Certification_Progress: For certification achievements
- Fact_Course_History: For historical completion
- Fact_Program_History: For program achievement
- Fact_Certification_History: For certification attainment

## Notes
- Covers fiscal years from 2012 to 2036
- Uses calendar year alignment
- Supports multiple fact tables
- Enables achievement reporting
- Facilitates success analysis
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
- Course completions
- Program achievements
- Certification attainment
- Learning milestones
- Compliance deadlines
- Performance tracking

## Analysis Capabilities
Enables analysis of:
- Completion patterns
- Success rates
- Achievement timing
- Performance trends
- Period achievements
- Success distributions

## Reporting Functions
Supports:
- Achievement reporting
- Success rate analysis
- Completion tracking
- Period performance
- Historical achievement
- Target setting

## Success Metrics
Tracks:
- Completion rates
- Time to completion
- Success patterns
- Achievement velocity
- Performance trends
- Goal attainment

## Compliance Tracking
Enables monitoring of:
- Deadline compliance
- Achievement timing
- Completion windows
- Grace periods
- Expiration dates
- Renewal timing 