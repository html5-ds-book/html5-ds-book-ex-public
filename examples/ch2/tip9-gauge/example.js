$(function() {
    var g = $.gauge("#gauge", {
        scale: {
            angles: [-0.3, Math.PI+0.3],
            values: [0, 220]
        },
        strip: [
            { from: 0,   to: 140, color:"#ada" },
            { from: 140, to: 180, color:"#dda" },
            { from: 180, to: 220, color:"#d88" }
        ],
        ticks: [{ 
            color: "rgba(0,0,0,0.33)", 
            values: { from: 0, to: 220, step:10 }, 
            length:0.05,
            radius:0.8,
            width:0.3
        }, { 
            color: "rgba(0,0,0,0.33)", 
            values: { from: 0, to: 220, step:20 }, 
            length:0.11, radius: 0.77,
            width:0.3
        }],
        labels: { 
            color: "#777",
            values: { from: 0, to: 220, step:20 },
            radius: 0.62
        },
        needle: { color:"#678" }
    });
    g(25); 
});

