# Dim_Course

## Purpose
This dimension table serves as the master reference for all course information in the learning platform. It maintains course definitions, categorization, and visibility settings, providing the foundational structure for both e-learning and in-person training offerings.

## Key Features
- Maintains course master data
- Supports multiple delivery methods
- Provides course categorization
- Controls dashboard visibility
- Links to both SCORM and classroom content
- Enables course catalog management

## Source Tables and Mappings

### analytics_course_completions.csv (Primary Course Data)
    Course_ID --> Course ID                # Unique course identifier
    Course_Name --> Course Name            # Official course title
    Course_Category --> Course Category    # Course classification
    Include_in_Dashboard --> Include in Dashboard  # Dashboard visibility flag

### analytics_scorm.csv (E-Learning Context)
    Course_ID --> Course ID                # Course reference
    Course_Name --> Course Name            # Course title validation

## Common Queries
- Course catalog listings
- Category-based reporting
- Dashboard content filtering
- Delivery method analysis
- Course offering patterns
- Content type distribution
- Course availability tracking

## Related Tables
- Fact_Course_Progress: For completion tracking
- Fact_Course_History: For historical analysis
- Fact_Course_to_Cert_Progress: For certification requirements
- Fact_Scorm: For e-learning details
- Fact_Seminar_Signup: For classroom sessions

## Notes
- Default record (Course_ID = -1) exists for handling unknown courses
- Supports both e-learning and classroom delivery
- Maintains consistent course naming
- Enables course categorization
- Controls reporting visibility
- Links to multiple delivery methods

## Course Categories
- Technical Skills
- Soft Skills
- Compliance
- Safety
- Professional Development
- Leadership
- Product Knowledge
- Process Training

## Delivery Methods
- E-Learning (SCORM)
- Classroom Training
- Virtual Instructor-Led
- Blended Learning
- Self-Paced
- Workshop
- Seminar

## Dashboard Visibility
The Include_in_Dashboard flag controls:
- Course catalog visibility
- Progress reporting inclusion
- Analytics dashboard presence
- KPI calculation inclusion
- Trend analysis participation 