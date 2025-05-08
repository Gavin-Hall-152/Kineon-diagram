/**
 * API route for handling user-related requests
 * Following the App Router pattern in Next.js 13+
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * User schema for request validation
 */
const userSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(['admin', 'user', 'analyst']).optional(),
});

/**
 * GET handler for users endpoint
 * @param {NextRequest} request - The incoming request
 * @returns {NextResponse} JSON response with users data
 */
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Mock data - in a real app, this would come from a database
    const mockUsers = Array.from({ length: 30 }, (_, i) => ({
      id: `user-${i + 1}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 5 === 0 ? 'admin' : i % 3 === 0 ? 'analyst' : 'user',
      createdAt: new Date().toISOString(),
    }));
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = mockUsers.slice(startIndex, endIndex);
    
    // Return paginated response
    return NextResponse.json({
      success: true,
      data: {
        items: paginatedUsers,
        totalItems: mockUsers.length,
        currentPage: page,
        totalPages: Math.ceil(mockUsers.length / limit),
        hasNextPage: endIndex < mockUsers.length,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

/**
 * POST handler for creating a new user
 * @param {NextRequest} request - The incoming request
 * @returns {NextResponse} JSON response with the created user data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validation = userSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed', 
          errors: validation.error.format() 
        },
        { status: 400 }
      );
    }
    
    // In a real app, this would create a user in the database
    const newUser = {
      id: `user-${Date.now()}`,
      ...validation.data,
      createdAt: new Date().toISOString(),
    };
    
    return NextResponse.json(
      { success: true, data: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create user' },
      { status: 500 }
    );
  }
}