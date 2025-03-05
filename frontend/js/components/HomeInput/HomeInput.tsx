import { Badge, Button, Form, Nav, CloseButton, Row, Stack } from "react-bootstrap";
import { KeyboardEvent, MouseEventHandler, useState } from "react";

type UsernameProps = {
    user: string, 
    removeUser: (name: string) => void,
    key: number
}

// To-do: have multiple username colors
function Username({user, removeUser, key}: UsernameProps) {
    return (
        <Badge bg="custom-pink d-flex rounded-pill align-items-center px-3 py-2 mx-1 gap-3" key={key} style={{color: "#FDFDFD"}}>
            {user}
            <div className="btn-close ms-2" aria-label="Close" onClick={() => removeUser(user)} style={{color: "#FDFDFD", cursor: "pointer"}}>x</div>
        </Badge>
    );
}

function UsernameInput() {
    const [users, setUsers] = useState<string[]>([]);
    const [input, setInput] = useState<string>("");

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && input.trim() !== "") {
            e.preventDefault();
            if (!users.includes(input.trim())) {
                setUsers([...users, input.trim()]);
            }
            setInput("");
        } 
    }

    function removeUser(user: string) {
        setUsers(users.filter((item) => item !== user));
    }

    return (
        <Form>
            <Form.Group className="mx-auto mt-3 text-center" style={{width: "80vw"}}>
                <Form.Label >Enter MyAnimeList username(s)</Form.Label>
                <Stack direction="horizontal" className="form-control gap-1">
                    {users.map((user, index) => (
                        <Username user={user} removeUser={removeUser} key={index}/>
                    ))}
                    <Form.Control 
                        type="text" 
                        className="border-0 shadow-none" 
                        style={{fontSize: "20px", height: "2.5em"}} 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </Stack>
            </Form.Group>
        </Form>
    );
}

function GenerateButton() {
    return (
        <Button variant="button-c" size="lg" className="btn-custom mx-auto px-5" style={{color: "#FDFDFD"}}>
            <Nav.Link href="/recs">Generate Recommendations</Nav.Link>
        </Button>
    );
}

export default function HomeInput() {
    return (
        <div className="d-grid gap-4">
            <Row><UsernameInput /></Row>
            <Row className="mx-auto text-center"><GenerateButton /></Row>
        </div>  
    );
}
