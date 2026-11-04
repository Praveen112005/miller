
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON requests
app.use(express.json());

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Calculator API
app.post("/calculate", (req, res) => {
    const { num1, num2, operation } = req.body;

    if (
        typeof num1 !== "number" ||
        typeof num2 !== "number" ||
        !Number.isFinite(num1) ||
        !Number.isFinite(num2)
    ) {
        return res.status(400).json({
            error: "Please provide valid numbers."
        });
    }

    let result;

    switch (operation) {
        case "add":
            result = num1 + num2;
            break;

        case "subtract":
            result = num1 - num2;
            break;

        case "multiply":
            result = num1 * num2;
            break;

        case "divide":
            if (num2 === 0) {
                return res.status(400).json({
                    error: "Cannot divide by zero."
                });
            }
            result = num1 / num2;
            break;

        default:
            return res.status(400).json({
                error: "Invalid operation."
            });
    }

    res.json({ result });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Calculator server running on port ${PORT}`);
});
