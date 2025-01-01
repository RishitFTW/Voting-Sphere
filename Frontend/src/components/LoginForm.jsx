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

export function LoginForm({ className, ...props }) {

  
  const [ formData, setformData]= useState({
    aadharCardNumber:"",
    password:""
  })

  const handleChange=(e)=>{
    const { id, value}= e.target
    setformData({...formData, [id]: value});
}

const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response= await fetch('http://localhost:4000/user/login',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData), 
      })

      if(!response.ok){
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Something went wrong'}`);
        return;        
      }

      const responseData= await response.json();
      alert('Sign in successful!'); 
      console.log('Response:', responseData); 
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to sign up. Please try again later.'); 
    }
}
  


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Fill in the details to create your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>


            {/* Aadhar Card Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="aadharCardNumber">Aadhar Card</Label>
              <Input id="aadharCardNumber" type="text" placeholder="12-digit Aadhar Number" required 
                value={formData.aadharCardNumber}
                onChange={handleChange}
              />
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
              Login
            </Button>

            {/* Footer */}
            <div className="mt-4 text-center text-sm text-gray-500">
              Dont have an account?{" "}
              <a href="/" className="text-blue-500 underline hover:text-blue-700">
                SignUp
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
