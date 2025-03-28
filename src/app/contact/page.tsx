import React from "react";

// filepath: /c:/Users/joand/Documents/CastConnect/CastConnect/src/app/contact/page.tsx

const ContactPage = () => {
    return (
        <div className="bg-background text-foreground min-h-screen flex items-center justify-center p-6">
            <div className="bg-card text-card-foreground rounded-lg shadow-md p-8 max-w-lg w-full">
                <h1 className="text-xl font-semibold mb-4">Contact Us</h1>
                <p className="text-muted-foreground mb-6">
                    We'd love to hear from you! Here's how you can reach us:
                </p>
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-medium">Email</h2>
                        <p className="text-foreground">contact@castconnect.com</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-medium">Phone</h2>
                        <p className="text-foreground">+1 (123) 456-7890</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-medium">Address</h2>
                        <p className="text-foreground">
                            123 CastConnect Lane, Suite 100<br />
                            Tech City, TC 12345
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
