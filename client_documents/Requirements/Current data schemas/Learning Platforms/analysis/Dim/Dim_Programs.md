# Dim_Programs

## Purpose
This dimension table serves as the master reference for all learning programs in the platform. It defines structured learning paths that combine multiple courses and certifications into comprehensive training programs, enabling organized skill development and career progression tracking.

## Key Features
- Defines program master data
- Provides program categorization
- Controls dashboard visibility
- Supports learning path structure
- Enables program catalog management
- Facilitates career development tracking

## Source Tables and Mappings

### analytics_prog_completions.csv (Primary Program Data)
    Program_ID --> Program ID              # Unique program identifier
    Program_Name --> Program Name          # Official program title
    Category --> Category                  # Program classification
    Include_in_Dashboard --> Include in Dashboard  # Dashboard visibility flag

## Common Queries
- Program catalog listings
- Category-based reporting
- Career path analysis
- Program availability tracking
- Component structure analysis
- Dashboard content filtering
- Program offering patterns

## Related Tables
- Fact_Program_Progress: For completion tracking
- Fact_Program_History: For historical analysis
- Fact_Course_Progress: For component progress
- Fact_Certification_Progress: For certification tracking
- Dim_Course: For course components
- Dim_Cert: For certification components

## Notes
- Default record (Program_ID = -1) exists for handling unknown programs
- Supports hierarchical learning paths
- Maintains consistent program naming
- Enables program categorization
- Controls reporting visibility
- Links to courses and certifications

## Program Categories
- Career Development
- Leadership Development
- Technical Certification
- Compliance Training
- Onboarding
- Professional Skills
- Industry Specialization
- Role-Specific Training

## Program Types
- Sequential Learning Path
- Flexible Learning Path
- Certification Track
- Role Preparation
- Skill Development
- Compliance Program
- Career Advancement
- Specialization Track

## Dashboard Visibility
The Include_in_Dashboard flag controls:
- Program catalog visibility
- Progress reporting inclusion
- Analytics dashboard presence
- KPI calculation inclusion
- Trend analysis participation

## Program Structure
Programs can include:
- Required Courses
- Optional Courses
- Required Certifications
- Elective Components
- Prerequisites
- Time-bound Requirements
- Completion Criteria
- Assessment Requirements 