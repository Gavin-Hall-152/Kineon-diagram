# Dim_SCORM

## Purpose
This dimension table maintains reference information for SCORM (Sharable Content Object Reference Model) content packages used in e-learning courses. It enables tracking and analysis of standardized e-learning content delivery and learner interaction across the platform.

## Key Features
- Tracks SCORM package information
- Maintains content identifiers
- Enables version control
- Supports content management
- Facilitates progress tracking
- Ensures standards compliance

## Source Tables and Mappings

### analytics_scorm.csv (SCORM Content)
    SCORM_ID --> RANKASC(SCORM Title)      # Unique content identifier
    SCORM_Title --> SCORM Title            # Content package title

## Common Queries
- Content package listings
- Version tracking
- Usage analysis
- Completion patterns
- Interaction metrics
- Performance tracking
- Content effectiveness

## Related Tables
- Fact_Scorm: For interaction tracking
- Fact_Course_Progress: For completion
- Fact_LearningTime: For engagement
- Dim_Course: For course context
- Dim_User: For learner tracking
- Fact_Course_History: For historical data

## Notes
- Supports SCORM standards
- Enables content tracking
- Maintains version control
- Facilitates reporting
- Supports analytics
- Ensures compliance

## Content Types
- Interactive Modules
- Assessment Packages
- Learning Objects
- Simulation Content
- Quiz Packages
- Reference Materials

## Version Management
Tracks:
- Package Versions
- Content Updates
- Standard Compliance
- Compatibility
- Dependencies
- Release History

## Content Structure
Components:
- Learning Objects
- Assessment Items
- Navigation Rules
- Sequencing Logic
- Interaction Points
- Progress Markers

## Standards Compliance
Supports:
- SCORM 1.2
- SCORM 2004
- xAPI Integration
- CMI5 Standards
- LTI Compatibility
- Content Packaging

## Interaction Tracking
Enables monitoring of:
- Progress States
- Completion Status
- Score Data
- Time Spent
- Interaction Points
- Bookmark Locations

## Analysis Capabilities
Supports analysis of:
- Content Usage
- Completion Rates
- Learning Patterns
- Interaction Data
- Performance Metrics
- Content Effectiveness

## Reporting Functions
Provides insights into:
- Content Performance
- Learner Progress
- Usage Patterns
- Interaction Data
- Success Rates
- Content Quality 