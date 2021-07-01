import React from "react";
import { ContactModal } from "../";
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

let getByTextId;
const onSubmit = jest.fn()

beforeEach(()=>{
    const component = render(<ContactModal submit={onSubmit}/>);
    getByTextId = component.getByTestId;
});

afterEach(cleanup);

test("Initializes empty form", ()=>{
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

    const errorDiv  = screen.queryByTestId("error");

    expect(errorDiv).not.toBeInTheDocument();

    expect(submitButton).toBeDisabled();
});

test('Enables submit button once form is valid', ()=>{
    const nameInput = screen.queryByPlaceholderText("Name");
    const phoneInput = screen.queryByPlaceholderText("Phone Number");
    const emailInput = screen.queryByPlaceholderText("Email Address");
    const submitButton = screen.getByText("Submit");

    const errorDiv  = screen.queryByTestId("error");

    fireEvent.change(nameInput, {
        target: {
            value: "Port Exe"
        }
    });

    expect(errorDiv).not.toBeInTheDocument();

    fireEvent.change(phoneInput, {
        target: {
            value: "123-456-7890"
        }
    });

    expect(errorDiv).not.toBeInTheDocument();

    fireEvent.change(emailInput, {
        target: {
            value: "test@test.com"
        }
    });

    expect(nameInput).toHaveValue("Port Exe")
    expect(submitButton).not.toBeDisabled();
});

test('Disables submit button if input form is invalid', ()=>{
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
            value: "123-456-78902222"
        }
    });

    fireEvent.change(emailInput, {
        target: {
            value: "test@test.com"
        }
    });

    expect(nameInput).toHaveValue("Port Exe")
    expect(submitButton).toBeDisabled();

    fireEvent.change(phoneInput, {
        target: {
            value: "123-456-7890"
        }
    });
    expect(submitButton).not.toBeDisabled();

    fireEvent.change(emailInput, {
        target: {
            value: "test@test"
        }
    });

    expect(submitButton).toBeDisabled();
});

test("Displays Error messages for invalid input", () => {
    const nameInput = screen.queryByPlaceholderText("Name");
    const phoneInput = screen.queryByPlaceholderText("Phone Number");
    const emailInput = screen.queryByPlaceholderText("Email Address");

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
            value: "test@test"
        }
    });

    let errorDiv  = getByTextId("error");

    expect(errorDiv.textContent).toBe("Email is improperly formatted");

    fireEvent.change(phoneInput, {
        target: {
            value: "1234567890"
        }
    });
    
    fireEvent.change(emailInput, {
        target: {
            value: "test@test.com"
        }
    });

    errorDiv  = getByTextId("error");
    // errorDiv  = screen.queryByTestId('error);

    expect(errorDiv.textContent).not.toBe("Email is improperly formatted");
    expect(errorDiv.textContent).toBe("Phone is improperly formatted");
});

test('Prevent submit function from being called if invalid', ()=>{
    const nameInput = screen.queryByPlaceholderText("Name");
    const phoneInput = screen.queryByPlaceholderText("Phone Number");
    const emailInput = screen.queryByPlaceholderText("Email Address");
    const submitButton = screen.getByText("Submit");
    const form = getByTextId("contact-modal-form");

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
            value: "test@test"
        }
    });

    expect(submitButton).toBeDisabled();

    fireEvent.submit(form);

    expect(onSubmit).not.toHaveBeenCalled();

    fireEvent.change(emailInput, {
        target: {
            value: "test@test.com"
        }
    });

    expect(submitButton).not.toBeDisabled();

    fireEvent.submit(form);
    
    expect(onSubmit).toHaveBeenCalled();
});