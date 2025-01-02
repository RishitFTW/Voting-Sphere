import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router";

export function SignupForm({ className, ...props }) {

  const navigate= useNavigate();

  const [formData, setformData]= useState({
      email: "",
      name: "",
      age: "",
      address: "",
      aadharCardNumber: "",
      role: "",
      password: "",
    }   
  )

  const handleChange=(e)=>{
      const { id, value}= e.target
      setformData({...formData, [id]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch('http://localhost:4000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Something went wrong'}`);
        return;
      }
  
      const responseData = await response.json();
      localStorage.setItem('authToken', responseData.token);
      alert('Sign up successful!'); 
      console.log('Response:', responseData); 
      navigate('/home');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to sign up. Please try again later.');
      
    }
  };
  

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Fill in the details to create your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required
                value={formData.name}
                onChange={handleChange} />
            </div>

            {/* Age Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" placeholder="25" required
                value={formData.age}
                onChange={handleChange}             
               />
            </div>

            {/* Address Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" type="text" placeholder="123 Main Street" required 
                value={formData.address}
                onChange={handleChange}                
              />
            </div>

            {/* Aadhar Card Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="aadharCardNumber">Aadhar Card</Label>
              <Input id="aadharCardNumber" type="text" placeholder="12-digit Aadhar Number" required 
                value={formData.aadharCardNumber}
                onChange={handleChange}                
              />
            </div>

            {/* Role Selection */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                className="border rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={formData.role}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  Select Role
                </option>
                <option value="voter">voter</option>
                <option value="admin">admin</option>
              </select>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" required 
                value={formData.password}
                onChange={handleChange}                
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Sign Up
            </Button>

            {/* Footer */}
            <div className="mt-4 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 underline hover:text-blue-700">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
