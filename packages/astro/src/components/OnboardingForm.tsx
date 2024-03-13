import { useState, type FormEvent } from 'react';
import React from 'react';



export default function OnboardingForm() {
    const [responseMessage, setResponseMessage] = useState<string>("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        console.log(formData);
        try {
            const response = await fetch("http://localhost:3000/api/databases/add_user", {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log("User added successfully")
                console.log(jsonResponse);
                setResponseMessage(jsonResponse.message);
            } else {
                throw new Error("Failed to add user");
            }
        } catch (e) {
            console.error(e);
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <label htmlFor="name">Full Name:</label>
                <input type="text" name="name" required />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" required />
                <label htmlFor="linkedin">LinkedIn URL:</label>
                <input type="url" name="linkedin" required />
                <label htmlFor="newsletter">Subscribe to our newsletter?</label>
                <input type="checkbox" name="newsletter" />
                <br />
                <label htmlFor="roleUpdates">Subscribe to role updates?</label>
                <br />
                <input type="checkbox" name="roleUpdates" />
                <br />
                <label htmlFor="How would you like to be involved?">How would you like to be involved?</label>
                <select name="How would you like to be involved?">
                    <option value="Mentor">Mentor</option>
                    <option value="Lead a project">Mentee</option>
                    <option value="Volunteer">Both</option>
                </select>
                <label htmlFor="role">Role:</label>
                <input type="text" name="role" required />
                <button type="submit">Submit</button>
                {responseMessage && <p>{responseMessage}</p>}
            </form>
        </>
    );
}