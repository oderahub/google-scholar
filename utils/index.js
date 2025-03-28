import { useState } from "react";
import { getContract } from "../utils/contract";

export default function Home() {
    const [message, setMessage] = useState("");
    const [newMessage, setNewMessage] = useState("");

    const fetchMessage = async () => {
        try {
            const contract = await getContract();
            const msg = await contract.message();
            setMessage(msg);
        } catch (error) {
            console.error("Error fetching message:", error);
        }
    };

    const updateMessage = async () => {
        try {
            const contract = await getContract();
            const tx = await contract.updateMessage(newMessage);
            await tx.wait();
            alert("Message updated!");
            fetchMessage();
        } catch (error) {
            console.error("Error updating message:", error);
        }
    };

    return (
        <div>
            <h1>Blockchain Message DApp</h1>
            <button onClick={fetchMessage}>Get Message</button>
            <p>Current Message: {message}</p>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={updateMessage}>Update Message</button>
        </div>
    );
}
