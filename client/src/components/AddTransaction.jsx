import { useContext, useState, useRef, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import Joi from "joi";

export const AddTransaction = () => {
  const amountInputRef = useRef(null);
  const textInputRef = useRef(null); // Create a ref for the text input

  const [text, setText] = useState("");
  const [amount, setAmount] = useState(""); // Initialize with an empty string
  const [error, setError] = useState("");

  const { addTransaction } = useContext(GlobalContext);

  const schema = Joi.object({
    text: Joi.string().min(1).required().messages({
      "string.empty": "Text is required",
      "any.required": "Text cannot be empty",
    }),
    amount: Joi.number().precision(2).not(0).required().messages({
      "number.base": "Amount must be a number",
      "number.empty": "Amount is required", // This will now trigger if amount is ""
      "number.min": "Amount must be greater than 0",
      "number.precision": "Amount can have at most 2 decimal places", // Custom message for precision error
    }),
  });

  const onSubmit = (e) => {
    e.preventDefault();

    // Convert amount to a number for validation
    const { error } = schema.validate(
      { text, amount: +amount || undefined },
      { abortEarly: false }
    );

    if (error) {
      setError(error.details[0].message);
      return; // Stop form submission if validation fails
    }

    setError(""); // Clear the error if validation passes
    const newTransaction = {
      text,
      amount: +amount, // Convert to number for transaction
    };
    addTransaction(newTransaction);
    setText("");
    setAmount(""); // Reset to an empty string
    textInputRef.current.focus();
  };

  useEffect(() => {
    if (error) {
      amountInputRef.current.focus();
    }
  }, [error]);

  return (
    <>
      <h3>Add new transaction</h3>
      <form id="form" onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            ref={textInputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input
            ref={amountInputRef}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="decimal"
            placeholder="Enter amount..."
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
