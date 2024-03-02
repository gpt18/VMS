import { strings } from "../utils/costants";

export default function Footer() {
    return (
        <section id='main-footer'>
            <div className="container mx-auto">
                <div className="font-bold bg-neutral-100 text-center py-2">
                    Made with 💖 by {strings.APP_NAME} 😊
                </div>
            </div>
        </section>
    );
}