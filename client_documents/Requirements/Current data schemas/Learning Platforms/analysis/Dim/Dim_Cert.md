# Dim_Cert

## Purpose
This dimension table serves as the master reference for all certifications in the learning platform. It defines certification requirements, validity periods, and relationships to courses and programs, enabling comprehensive tracking of professional qualifications and compliance requirements.

## Key Features
- Defines certification master data
- Provides certification categorization
- Controls dashboard visibility
- Manages certification requirements
- Enables certification tracking
- Supports compliance monitoring

## Source Tables and Mappings

### analytics_cert_completions.csv (Primary Certification Data)
    Cert_ID --> Certification ID           # Unique certification identifier
    Certification_Name --> Certification Name  # Official certification title
    Course_Category --> Course Category    # Certification classification
    Include_in_Dashboard --> Include in Dashboard  # Dashboard visibility flag

## Common Queries
- Certification catalog listings
- Category-based reporting
- Compliance requirement tracking
- Certification availability
- Requirement structure analysis
- Dashboard content filtering
- Certification validity tracking

## Related Tables
- Fact_Certification_Progress: For completion tracking
- Fact_Certification_History: For historical analysis
- Fact_Course_to_Cert_Progress: For course requirements
- Dim_Course: For required courses
- Dim_Programs: For program context
- Dim_User: For certification holders

## Notes
- Default record (Cert_ID = -1) exists for handling unknown certifications
- Supports multiple certification types
- Maintains consistent certification naming
- Enables certification categorization
- Controls reporting visibility
- Links to courses and programs

## Certification Categories
- Professional Qualifications
- Technical Certifications
- Compliance Requirements
- Safety Certifications
- Industry Standards
- Internal Qualifications
- Regulatory Requirements
- Specialized Skills

## Certification Types
- Initial Certification
- Renewal Certification
- Advanced Certification
- Specialist Certification
- Compliance Certification
- Professional License
- Industry Recognition
- Internal Qualification

## Dashboard Visibility
The Include_in_Dashboard flag controls:
- Certification catalog visibility
- Compliance reporting inclusion
- Analytics dashboard presence
- KPI calculation inclusion
- Trend analysis participation

## Certification Requirements
Certifications can include:
- Mandatory Courses
- Elective Courses
- Prerequisites
- Time Limits
- Renewal Requirements
- Assessment Criteria
- Continuing Education
- Practical Experience

## Validity Management
Certifications track:
- Initial Achievement
- Expiration Dates
- Renewal Periods
- Grace Periods
- Revocation Conditions
- Reinstatement Requirements 