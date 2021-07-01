import React, {useState, useEffect} from 'react';
import styles from './ContactModal.css';

export const ContactModal = ({submit}) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");

    const [isValid, setIsValid] = useState(false);
    const [isFormDirty, setFormDirty]= useState(false);

    useEffect(()=>{
        if(!isFormDirty){
            return;
        }
        setNameError("");
        setPhoneError("");
        setEmailError("");

        let _valid = (()=>{
            if(!name){
                setNameError("Name is required");
                return false;
            }else if (!phone){
                setPhoneError("Phone is required");
                return false;
            }else if (!email){
                setEmailError("Email is required");
                return false;
            }else if(!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone)){
                setPhoneError("Phone is improperly formatted");
                return false;
            }else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase())){
                setEmailError("Email is improperly formatted");
                return false;
            }else {
                return true;
            }
        })();

        setIsValid(_valid);
        
    }, [name, phone, email, isFormDirty]);

    return (
        <div className={styles.main}>
            <form 
                data-testid="contact-modal-form"
                onSubmit={(e)=> {
                    e.preventDefault();
                    if (isValid){
                        submit();
                    }
                }}
            >
                <div>
                    <input 
                        required
                        placeholder="Name"
                        value={name}
                        onChange= {e=> {
                            setFormDirty(true);
                            setName(e.target.value);
                        }}
                    />
                    {!!nameError && <div className={styles.error} data-testid="error">{nameError}</div>}
                </div>
                <div>
                    <input 
                        required 
                        placeholder="Phone Number"
                        value={phone}
                        onChange={e => {
                            setFormDirty(true);
                            setPhone(e.target.value);
                        }}
                    />
                     {!!phoneError && <div className={styles.error} data-testid="error">{phoneError}</div>}
                </div>
                <div>
                    <input 
                        required 
                        placeholder="Email Address"
                        value={email}
                        onChange={e=>{ 
                            setFormDirty(true);
                            setEmail(e.target.value);
                        }}
                    />
                     {!!emailError && <div className={styles.error} data-testid="error">{emailError}</div>}
                </div>

                <button disabled={!isValid}>Submit</button>
            </form>
        </div>
    );
}
