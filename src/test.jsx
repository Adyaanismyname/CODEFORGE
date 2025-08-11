import { useEffect } from 'react';
import Lenis from 'lenis';

export default function ScrollDebugTest() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2, // how long the scroll feels
            easing: (t) => 1 - Math.pow(1 - t, 4), // ease-out cubic
            smoothWheel: true,
            smoothTouch: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);

    return (
        <div style={{ fontFamily: 'sans-serif', lineHeight: '1.5' }}>
            <header style={{ padding: '2rem', background: '#222', color: 'white', position: 'sticky', top: 0 }}>
                <h1>Super Smooth Scroll Demo</h1>
            </header>

            {[...Array(6)].map((_, i) => (
                <section
                    key={i}
                    style={{
                        height: '100vh',
                        padding: '3rem',
                        background: i % 2 === 0 ? '#f0f0f0' : '#ddd',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <h2>Section {i + 1}</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio,
                        vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.
                    </p>
                    <p>
                        Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac.
                        In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis.
                    </p>
                </section>
            ))}
        </div>
    );
}
