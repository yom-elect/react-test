import React from "react";
import { ContactModal } from "../";
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

// test("modal has correct text", async ()=>{
//     render(<ContactModal/>);
//     const text = await screen.findByText("Contact Modal");

//     expect(text).toBeInTheDocument();
// });

test("Initializes empty form", ()=>{
    render(<ContactModal/>);

    const nameInput = screen.queryByPlaceholderText("Name");
    const phoneInput = screen.queryByPlaceholderText("Phone Number");
    const emailInput = screen.queryByPlaceholderText("Email Address");
    const submitButton = screen.getByText("Submit");

    expect(nameInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();

    expect(nameInput).toHaveValue("");
    expect(phoneInput).toHaveValue("");
    expect(emailInput).toHaveValue("");

    expect(submitButton).toBeDisabled();
});

test('Disables submit button until form is valid', ()=>{
    render(<ContactModal/>);

    const nameInput = screen.queryByPlaceholderText("Name");
    const phoneInput = screen.queryByPlaceholderText("Phone Number");
    const emailInput = screen.queryByPlaceholderText("Email Address");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(nameInput, {
        target: {
            value: "Port Exe"
        }
    });

    fireEvent.change(phoneInput, {
        target: {
            value: "123-456-7890"
        }
    });

    fireEvent.change(emailInput, {
        target: {
            value: "test@test.com"
        }
    });

    expect(nameInput).toHaveValue("Port Exe")
    expect(submitButton).not.toBeDisabled();
});