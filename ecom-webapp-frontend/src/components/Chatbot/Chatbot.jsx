import React, { useEffect, useRef, useState } from "react";
import chatbot_icon from "../../assets/images/chat-bot.svg";
import "../Chatbot/chatbot.css";
<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
/>;

function Chatbot() {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [isExpanded, setIsExpanded] = useState(false);
	const [error, setError] = useState("");
	const [isMinimized, setIsMinimized] = useState(false); // New state to track if the chatbot is minimized
	const isMounted = useRef(true);

	useEffect(() => {
		isMounted.current = true;
		// This function runs when the chatbot component is mounted
		const greetingMessage = {
			text:
				"Hello! My name is GadgetCo.\n I am your customer service chatbot.\n  How can I assist you today?",
			sender: "bot",
		};
		setMessages([greetingMessage]); // Set the initial message

		return () => {
			isMounted.current = false;
		};
	}, []); // The empty array ensures this effect runs only once on mount

	const sendMessage = async (userMessage) => {
		// setIsLoading(true);
		const typingMessage = { text: "GadgetCo is typing...", sender: "bot" };
		setMessages((currentMessages) => [...currentMessages, typingMessage]);
		try {
			const response = await fetch("http://localhost:5000/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message: userMessage }),
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const responseData = await response.json();
			setMessages((currentMessages) =>
				currentMessages.filter((msg) => msg.text !== "GadgetCo is typing...")
			);
			if (isMounted.current) {
				// Only update state if component is still mounted
				const botMessage = {
					text: modifyResponse(responseData.response),
					sender: "bot",
					sentiment: responseData.sentiment,
				};
				setMessages((currentMessages) => [...currentMessages, botMessage]);
			}
			// setIsLoading(false);
		} catch (error) {
			console.error("Failed to fetch:", error);
			if (isMounted) {
				setError("Error connecting to the chat service.");
			}
		} finally {
			if (isMounted) {
				// setIsLoading(false);
			}
		}
	};
	const modifyResponse = (response) => {
		// Define replacements
		const replacements = {
			"{{Account Type}}": "Cheap",
			"{{Order Number}}": "123456789",
			"{{Invoice Number}}": "987654321",
			"{{Online Order Interaction}}": "replacement value",
			"{{Online Payment Interaction}}": "replacement value",
			"{{Online Navigation Step}}": "replacement value",
			"{{Online Customer Support Channel}}": "replacement value",
			"{{Profile}}": "replacement value",
			"{{Profile Type}}": "replacement value",
			"{{Settings}}": "replacement value",
			"{{Online Company Portal Info}}": "replacement value",
			"{{Date}}": "replacement value",
			"{{Date Range}}": "replacement value",
			"{{Shipping Cut-off Time}}": "replacement value",
			"{{Delivery City}}": "Leicester",
			"{{Salutation}}": "United Kingdom",
			"{{Delivery Country}}": "United Kingdom",
			"{{Client First Name}}": "Femi",
			"{{Client Last Name}}": "Osibemekun",
			"{{Customer Support Phone Number}}": "07377788552",
			"{{Customer Support Email}}": "00158@student.le.ac.uk",
			"{{Live Chat Support}}": "United Kingdom",
			"{{Website URL}}": "gadgetco.co.uk",
			"{{Upgrade Account}}": "United Kingdom",
			"{{Account Category}}": "new",
			"{{Account Change}}": "Premium",
			"{{Program}}": "United Kingdom",
			"{{Refund Amount}}": "United Kingdom",
			"{{Money Amount}}": "United Kingdom",
			"{{Store Location}}": "United Kingdom",
		};

		// Replace all placeholders with their corresponding replacements
		let modifiedResponse = response;
		for (let placeholder in replacements) {
			modifiedResponse = modifiedResponse.replace(
				new RegExp(placeholder, "g"),
				replacements[placeholder]
			);
		}

		return modifiedResponse;
	};

	const handleInputChange = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		const userMessage = { text: input, sender: "user" };
		setMessages((messages) => [...messages, userMessage]);
		sendMessage(input);
		setInput("");
	};

	const toggleSize = () => {
		setIsExpanded(!isExpanded);
		if (isMinimized) {
			setIsMinimized(false);
		}
	};

	const minimizeChatbot = () => {
		setIsMinimized(true);
		setIsExpanded(false);
	};

	return (
		<div>
			{!isMinimized ? (
				<div className={`chatbot ${isExpanded ? "expanded" : "compact"}`}>
					<div className="chatbot-header">
						GadgetCo Chatbot
						<div className="header-buttons">
							<button className="resize-button" onClick={toggleSize}>
								{isExpanded ? "-" : "+"}
							</button>
							<button className="resize-button" onClick={minimizeChatbot}>
								X
							</button>
						</div>
					</div>
					{error && <div className="error-message">{error}</div>}

					<div className="chat-messages">
						{messages.map((message, index) => (
							<div key={index} className={`message ${message.sender}`}>
								{message.text}
							</div>
						))}
					</div>
					<form onSubmit={handleSubmit} className="chat-input">
						<input
							type="text"
							value={input}
							onChange={handleInputChange}
							placeholder="Type a message..."
						/>
						<button type="submit">Send</button>
					</form>
				</div>
			) : (
				<button className="chatbot-icon" onClick={() => setIsMinimized(false)}>
					<img src={chatbot_icon} alt="chatbot logo" />
				</button>
			)}
		</div>
	);
}

export default Chatbot;
