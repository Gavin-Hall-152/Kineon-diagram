# Learning Platforms Data Warehouse Structure

## 1. Core Fact Tables and Their Purposes

### Main Fact Tables
```
- Fact_Course_Progress: Tracks individual course completions
- Fact_Certification_Progress: Tracks certification progress
- Fact_Course_to_Cert_Progress: Links courses to certifications
- Fact_Program_Progress: Tracks program completions
- Fact_LearningTime: Combines both e-learning and in-person learning time
- Fact_Scorm: Tracks e-learning specific details
- Fact_Seminar_Signup: Tracks in-person training attendance
```

### Historical Snapshot Fact Tables
```
- Fact_Course_History: Creates yearly snapshots of course progress
- Fact_Certification_History: Creates yearly snapshots of certification status
- Fact_Course_to_Cert_History: Creates yearly snapshots of course-certification links
- Fact_Program_History: Creates yearly snapshots of program progress
```

These history tables provide point-in-time snapshots for each fiscal year, with different status transitions:

Course/Program History:
- FY19: Status = 'In Progress'
- FY20: Status = 'In Progress'
- FY21: Status = 'Completed'

Certification History:
- FY19: Status = 'Not certified'
- FY20: Status = 'Not certified'
- FY21: Status = 'Certified'

Course-to-Cert History:
- Tracks the relationship between courses and certifications over time
- Shows how course completions contribute to certification achievements

This temporal tracking enables:
- Year-over-year analysis
- Progress tracking across fiscal years
- Historical status reporting
- Completion trend analysis
- Status transition patterns
- Certification compliance history
- Course-certification relationship tracking

## 2. Key Dimension Tables and Their Roles
```
- Dim_User: Central user information (demographics, org structure)
- Dim_Course: Course catalog (both e-learning and in-person)
- Dim_Cert: Certification definitions
- Dim_Programs: Program definitions
- Dim_SCORM: E-learning content details
- Dim_Seminar_Event/Session: In-person training details
- Dim_FY_Began/Completed: Fiscal year references
```

## 3. Data Flow and Relationships
Primary source data comes from CSV files:
```
- analytics_course_completions.csv (in-person learning)
- analytics_scorm.csv (e-learning)
- analytics_cert_completions.csv (certifications)
- analytics_prog_completions.csv (programs)
- analytics_seminar_attendance.csv (seminars)
- analytics_users.csv (user data)
```

## 4. Key Design Patterns

### Progress Tracking Dimensions
Common pattern for Course, Certification, and Program tracking:
```
- Track assignment dates
- Track completion dates
- Include status information
- Maintain historical vs current assignments
```

### Time Tracking Split
```
- E-learning (SCORM-based tracking)
- In-person (session-based tracking)
```

### Historical Snapshots Pattern
```
- Each history fact table maintains yearly records
- Status transitions are preserved
- Links to both start and completion fiscal years
- Enables temporal analysis and reporting
- Different status values for different entity types (courses vs certifications)
- Tracks relationships between entities over time
```

### Hierarchical Relationships
```
Courses → Certifications → Programs
Users → Managers → Organizations
```

## 5. Special Features

- All dimension tables include a default record (usually ID = -1) for handling missing data
- Fiscal year dimensions support both start and completion date analysis
- Learning time is tracked separately for online and in-person formats
- User hierarchy is maintained through manager relationships
- Historical snapshots maintain temporal state changes
- Multiple status tracking patterns for different entity types

## Analysis Capabilities

This structure enables analysis of:
- Individual learning progress
- Certification completion rates
- Program effectiveness
- Time spent learning
- Organizational learning patterns
- Compliance tracking
- Both online and in-person training metrics
- Year-over-year comparisons
- Historical status tracking
- Completion trends over time
- Course-certification relationships over time
- Status transition patterns
- Compliance history tracking

The snowflake schema design helps maintain data consistency while allowing flexible reporting across different aspects of the learning management system. 