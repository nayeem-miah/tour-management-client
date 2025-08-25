import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Unauthorized() {
    return (
        <div>
            <h1>Muri kha ................... tuii authorized na</h1>
            <Button variant={"link"}>
                <Link to={"/"}>Back to Home</Link>
            </Button>
        </div>
    )
}
