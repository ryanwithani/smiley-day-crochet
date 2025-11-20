export function DecorationCircles() {
    return (
        <>
            {/* Top-left decoration */}
            <div
                className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-60"
                style={{ backgroundColor: 'hsl(var(--muted))' }}
                aria-hidden="true"
            />

            {/* Bottom-right decoration */}
            <div
                className="absolute bottom-20 right-20 w-32 h-32 rounded-full opacity-60"
                style={{ backgroundColor: 'hsl(var(--accent))' }}
                aria-hidden="true"
            />

            {/* Additional middle decoration for visual interest */}
            <div
                className="absolute top-1/2 left-[15%] w-20 h-20 rounded-full opacity-40"
                style={{ backgroundColor: 'hsl(var(--primary) / 0.5)' }}
                aria-hidden="true"
            />
        </>
    );
}