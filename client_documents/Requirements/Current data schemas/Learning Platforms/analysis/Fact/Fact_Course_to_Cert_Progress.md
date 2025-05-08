# Fact_Course_to_Cert_Progress

## Purpose
This fact table manages the relationship between courses and certifications, tracking how individual course completions contribute to certification achievement. It serves as the bridge between course-level learning and certification attainment, enabling comprehensive tracking of certification requirements fulfillment.

## Key Features
- Links courses to certification requirements
- Tracks course completion contribution to certifications
- Maintains enrollment and completion timestamps
- Monitors certification progress through courses
- Supports fiscal year-based analysis
- Enables certification pathway tracking

## Source Tables and Mappings

### analytics_course_completions.csv (Course Progress Data)
    User_ID --> User ID                    # Learner identifier
    Course_ID --> Course ID                # Course identifier
    Time_enrolled --> Time enrolled        # Course enrollment date
    Time_completed --> Time completed      # Course completion date
    Completion_Due_Date --> Completion Due Date  # Course deadline

### analytics_cert_overview.csv (Certification Structure)
    Course_ID --> Course ID                # Required course
    User_ID --> User ID                    # Learner identifier
    Certification_ID --> Certification ID   # Target certification

### Dim_Course_Progress (Course Details)
    Course_ID --> Course_ID                # Course reference
    User_ID --> User_ID                    # Learner reference
    Course_User_ID --> Course_User_ID      # Course-user combination ID

### Dim_Certification_Progress (Certification Context)
    Certification_ID --> Certification ID   # Certification reference
    User_ID --> User ID                    # Learner reference
    Certification_User_ID --> Certification_User_ID  # Certification-user combination
    Time_assigned --> Time assigned        # Certification assignment date

### Dim_FY_Completed (Completion Fiscal Year)
    Date_Completed --> FYStartDate         # Fiscal year start for completion
    Date_Completed --> FYEndDate           # Fiscal year end for completion

### Dim_FY_Began (Start Fiscal Year)
    Date_Began --> FYStartDate             # Fiscal year start for enrollment
    Date_Began --> FYEndDate               # Fiscal year end for enrollment

## Common Queries
- Certification requirement completion rates
- Course contribution to certifications
- Certification pathway progress
- Time to certification analysis
- Course sequence patterns
- Certification bottleneck identification
- Prerequisite completion tracking

## Related Tables
- Fact_Course_Progress: For detailed course tracking
- Fact_Certification_Progress: For certification status
- Fact_Course_to_Cert_History: For historical snapshots
- Dim_Course: For course details
- Dim_Cert: For certification requirements
- Dim_User: For learner information

## Notes
- Supports multiple courses per certification
- Tracks both mandatory and optional courses
- Enables certification pathway analysis
- Maintains course-certification relationships
- Supports complex certification requirements
- Links to historical snapshots for trend analysis

## Relationship Types
- Required: Course must be completed for certification
- Optional: Course contributes but isn't mandatory
- Prerequisite: Course must be completed before others
- Elective: One of several course options required 