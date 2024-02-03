import { useState, useRef, useEffect } from "react"
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6"


const FormTemplate = () => {
  // First Name Field
  const [firstName, setFirstName] = useState("")
  const [firstNameFocus, setFirstNameFocus] = useState(false)
  const [firstNameValid, setFirstNameValid] = useState(false)
  // Second Name Field
  const [secondName, setSecondName] = useState('')
  const [secondNameFocus, setSecondNameFocus] = useState(false)
  const [secondNameValid, setSecondNameValid] = useState(false)
  // First Email Field
  const [firstEmail, setFirstEmail] = useState('')
  const [firstEmailFocus, setFirstEmailFocus] = useState(false)
  const [firstEmailValid, setFirstEmailValid] = useState(false)
  // Second Email Field
  const [secondEmail, setSecondEmail] = useState('')
  const [secondEmailFocus, setSecondEmailFocus] = useState(false)
  const [secondEmailValid, setSecondEmailValid] = useState(false)
  // First Password Field
  const [firstPassword, setFirstPassword] = useState('')
  const [firstPasswordFocus, setFirstPasswordFocus] = useState(false)
  const [firstPasswordValid, setFirstPasswordValid] = useState(false)  
  // Second Password Field
  const [secondPassword, setSecondPassword] = useState('')
  const [secondPasswordFocus, setSecondPasswordFocus] = useState(false)
  const [secondPasswordValid, setSecondPasswordValid] = useState(false)
  // Message State
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState(false)
  // References & Focus
  const firstNameRef = useRef()
  const messageRef = useRef()
  useEffect(() => {
    firstNameRef.current.focus()
  },[])
  // Validation Name
  useEffect(() => {
    const nameRegEx = new RegExp(/^(\w{4,48})$/)
    if (nameRegEx.test(firstName.toString())) {
      setFirstNameValid(true)
    } else {
      setFirstNameValid(false)
    }
    if (nameRegEx.test(secondName.toString())) {
      setSecondNameValid(true)
    } else {
      setSecondNameValid(false)
    }
  },[firstName, secondName])
  // Validation Email
  useEffect(() => {
    const emailRegEx = new RegExp(/^([a-zA-Z0-9_.+/*&%#!-]{1,64})@([\w+]{1,254})\.([\w+]+)\.?(\w{1,254})$/)
    if (emailRegEx.test(firstEmail.toString())) {
      setFirstEmailValid(true)
    } else {
      setFirstEmailValid(false)
    }
    if (secondEmail.toString() === firstEmail.toString()) {
      setSecondEmailValid(true)
    } else {
      setSecondEmailValid(false)
    }
  },[firstEmail, secondEmail])
  // Validation Password
  useEffect(() => {
    const passwordRegEx = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!$&_#@+-])[a-zA-Z0-9?!$&_#@+-]{8,254}$/)
    if (passwordRegEx.test(firstPassword.toString())) {
      setFirstPasswordValid(true)
    } else {
      setFirstPasswordValid(false)
    }
    if (secondPassword.toString() === firstPassword.toString()) {
      setSecondPasswordValid(true)
    } else {
      setSecondPasswordValid(false)
    }
  },[firstPassword, secondPassword])
  // Valid Input Check
  const validInputs = () => {
    if (
      firstNameValid 
        && secondNameValid 
        && firstEmailValid 
        && secondEmailValid
        && firstPasswordValid
        && secondPasswordValid        
    ) {
      return true
    } else {
      return false
    }
  }
  
  // Form Event Handle
  const handleFormReset = (e) => {
    try {
      setFirstName('')
      setSecondName('')
      setFirstEmail('')
      setSecondEmail('')
      setFirstPassword('')
      setSecondPassword('')
      setFormSuccess(false)
      setFormError(false)
      firstNameRef.current.focus()
    } catch (error) {
      console.log(error.type, error.message)
    } finally {
      console.log('form reset')
    }
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    try {
      if (validInputs()) {
        console.log('Form successfully submitted!')
        setFormSuccess(true)
        messageRef.current.focus()
      } else {
        console.log('Form submission was unsuccessful!')
        setFormError(true)
        messageRef.current.focus()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section>
      <form id="formValidation" className="form_container">
        {/* Form Messages */}
        <div className={`form_message ${formSuccess && "success"} ${formError && "failed"} `} >
          <h3>{formSuccess && "!! Submitted !!"}</h3>
          <h3>{formError && "!! Error !!"}</h3>
          <p>{formSuccess && "Details entered onto the form have been successfully submitted."}</p>
          <p>{formError && "There was a problem with the form data entered."}</p>
          <p>{formError && "Please clear the form and try again."}</p>
          <button 
            type="reset" 
            className={`btn ${formSuccess && 'success'} ${formError && 'failed'} `}
            onClick={handleFormReset}
            ref={messageRef}
          >
            Clear Form
          </button>
        </div>
        <h2>Validation Form</h2>
        {/* Forename Input */}
        <label htmlFor="formFirstName">Forename:
          <i>
            {firstName 
            ? firstNameValid 
              ? <FaCircleCheck style={{ fill: "lightgreen", background: "black"}}/> 
              : <FaCircleXmark style={{ fill: "red", background: "black"}}/>
            : "" 
            }
          </i>
        </label>
        <input 
          id="formFirstName"
          type="text" 
          autoComplete="off"
          required
          placeholder="Please enter your forename..."
          ref={firstNameRef}
          value={firstName}
          onChange={e => setFirstName(e.target.value)} 
          onFocus={() => setFirstNameFocus(true)}
          onBlur={() => setFirstNameFocus(false)}
          aria-describedby="firstNameInfo"
          aria-invalid={firstNameValid ? "false" : "true"}
        />
        <p id="firstNameInfo" 
          className={firstNameFocus ? "form_show" : ""}
          aria-hidden={firstNameFocus && !firstEmailValid ? false : true}
        >
          4 to 48 characters <br />
          Can only contain uppercase & lowercase letters & numbers, with no spaces. Underscores allowed. <br />
          <span aria-label="underscore symbol">_</span>
        </p>
        {/* Surname Input */}
        <label htmlFor="formSecondName">Surname:
          <i>
            {secondName 
            ? secondNameValid 
              ? <FaCircleCheck style={{ fill: "lightgreen", background: "black"}}/> 
              : <FaCircleXmark style={{ fill: "red", background: "black"}}/>
            : "" }
          </i>
        </label>
        <input 
          id="formSecondName"  
          type="text"
          autoComplete="off"
          required
          placeholder="Please enter your surname..."
          value={secondName}
          onChange={e => setSecondName(e.target.value)}
          onFocus={() => setSecondNameFocus(true)}
          onBlur={() => setSecondNameFocus(false)}
          aria-describedby="secondNameInfo"
          aria-invalid={secondNameValid ? "false" : "true"}
        />
        <p id="secondNameInfo" className={secondNameFocus ? "form_show" : ""}>
          4 to 48 characters <br />
          Can only contain uppercase & lowercase letters & numbers, with no spaces. Underscores allowed. <br />
          <span aria-label="underscore symbol">_</span>
        </p>
        {/* Email Initial Input */}
        <label htmlFor="formFirstEmail">Email:
          <i>
            {firstEmail 
            ? firstEmailValid 
              ? <FaCircleCheck style={{ fill: "lightgreen", background: "black"}}/> 
              : <FaCircleXmark style={{ fill: "red", background: "black"}}/>
            : "" }
          </i>
        </label>
        <input 
          id="formFirstEmail"
          type="email" 
          autoComplete="new-off" // fix
          required
          placeholder="Please enter your email..."
          value={firstEmail}
          onChange={e => setFirstEmail(e.target.value)}
          onFocus={() => setFirstEmailFocus(true)}
          onBlur={() => setFirstEmailFocus(false)}
          aria-describedby="firstEmailInfo"
          aria-invalid={firstEmailValid ? "false" : "true"}
        />
        <p id="firstEmailInfo" className={firstEmailFocus ? "form_show" : ""} >
          Can contain letters & numbers and a single<span aria-label="at symbol"> @</span> symbol. <br />
          <span aria-label="underscore symbol"> _</span>
          <span aria-label="full stop symbol"> .</span>
          <span aria-label="plus symbol"> +</span>
          <span aria-label="forward slash symbol"> /</span>
          <span aria-label="multiply symbol"> *</span>
          <span aria-label="ampersand symbol"> &</span>
          <span aria-label="percent symbol"> %</span>
          <span aria-label="exclamation symbol"> !</span>
          <span aria-label="hyphen symbol"> -</span>
        </p>
        {/* Email Confirm Input */}
        <label htmlFor="formSecondEmail">Confirm Email:
          <i>
            {secondEmail 
            ? secondEmailValid 
              ? <FaCircleCheck style={{ fill: "lightgreen", background: "black"}}/> 
              : <FaCircleXmark style={{ fill: "red", background: "black"}}/>
            : "" }
          </i>
        </label>
        <input 
          id="formSecondEmail"
          type="email" 
          autoComplete="off"
          required
          placeholder="Please confirm your email..."
          value={secondEmail}
          onChange={e => setSecondEmail(e.target.value)}
          onFocus={() => setSecondEmailFocus(true)}
          onBlur={() => setSecondEmailFocus(false)}
          aria-describedby="secondEmailInfo"
          aria-invalid={secondEmailValid ? "false" : "true"}
        />
        <p id="secondEmailInfo" className={secondEmailFocus ? "form_show" : ""}>
          Must match Email field: <br />
          Can contain letters & numbers and a single<span aria-label="at symbol"> @</span> symbol. <br />
          <span aria-label="underscore symbol"> _</span>
          <span aria-label="full stop symbol"> .</span>
          <span aria-label="plus symbol"> +</span>
          <span aria-label="forward slash symbol"> /</span>
          <span aria-label="multiply symbol"> *</span>
          <span aria-label="ampersand symbol"> &</span>
          <span aria-label="percent symbol"> %</span>
          <span aria-label="exclamation symbol"> !</span>
          <span aria-label="hyphen symbol"> -</span>
        </p>
        {/* Password Input */}
        <label htmlFor="formFirstPassword">Create Password:
          <i>
            {firstPassword 
            ? firstPasswordValid 
              ? <FaCircleCheck style={{ fill: "lightgreen", background: "black"}}/> 
              : <FaCircleXmark style={{ fill: "red", background: "black"}}/>
            : "" }
          </i>
        </label>
        <input 
          id="formFirstPassword"
          type="password" 
          autoComplete="new-password" // fix
          required
          placeholder="Please create a password..."
          value={firstPassword}
          onChange={e => setFirstPassword(e.target.value)}
          onFocus={() => setFirstPasswordFocus(true)}
          onBlur={() => setFirstPasswordFocus(false)}
          aria-describedby="firstPasswordInfo"
          aria-invalid={firstPasswordValid ? "false" : "true"}
        />
        <p id="firstPasswordInfo" className={firstPasswordFocus ? "form_show" : ""}>
          Minimum of 8 characters. <br />
          Must contain at least one of each: uppercase, lowercase, number & special character. <br />
          <span aria-label="at symbol"> ?</span>
          <span aria-label="exclamation symbol"> !</span>
          <span aria-label="dollar symbol"> $</span>
          <span aria-label="ampersand symbol"> &</span>
          <span aria-label="underscore symbol"> _</span>
          <span aria-label="hashtag symbol"> #</span>
          <span aria-label="at symbol"> @</span>
          <span aria-label="plus symbol"> +</span>
          <span aria-label="minus symbol"> -</span>
        </p>
        {/* Password Confirm Input */}
        <label htmlFor="formSecondPassword">Confirm Password:
          <i>
            {secondPassword 
            ? secondPasswordValid 
              ? <FaCircleCheck style={{ fill: "lightgreen", background: "black"}}/> 
              : <FaCircleXmark style={{ fill: "red", background: "black"}}/>
            : "" }
          </i>
        </label>
        <input 
          id="formSecondPassword"
          type="password" 
          autoComplete="new-password" // fix
          required
          placeholder="Please confirm your password..."
          value={secondPassword}
          onChange={e => setSecondPassword(e.target.value)}
          onFocus={() => setSecondPasswordFocus(true)}
          onBlur={() => setSecondPasswordFocus(false)}
          aria-describedby="secondPasswordInfo"
          aria-invalid={secondPasswordValid ? "false" : "true"}
        />
        <p id="secondPasswordInfo" className={secondPasswordFocus ? "form_show" : ""}>
          Must match password: <br />
          Minimum of 8 characters. <br />
          Must contain at least one of each: uppercase, lowercase, number & special character. <br />
          <span aria-label="at symbol"> ?</span>
          <span aria-label="exclamation symbol"> !</span>
          <span aria-label="dollar symbol"> $</span>
          <span aria-label="ampersand symbol"> &</span>
          <span aria-label="underscore symbol"> _</span>
          <span aria-label="hashtag symbol"> #</span>
          <span aria-label="at symbol"> @</span>
          <span aria-label="plus symbol"> +</span>
          <span aria-label="minus symbol"> -</span>
        </p>
        {/* Submit Button */}
        <button 
          className={`${validInputs() === true ? "show" : "hide"}`}
          type="submit"
          form="formValidation"
          aria-label="Submit form information"
          onClick={handleFormSubmit}
          disabled={validInputs() ? false : true}
        >
          Submit
        </button>
        {/* Clear Button */}
        <button
          type="reset"
          form="formValidation"
          aria-label="Reset form information fields"
          onClick={handleFormReset}
        >
          Reset
        </button>
      </form>
    </section>
  )
}


export default FormTemplate

