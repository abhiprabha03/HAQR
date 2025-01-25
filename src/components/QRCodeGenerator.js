import React, { useState, useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { Frame, Square, Circle, Triangle, Hexagon, Shapes } from "lucide-react";
import { Sparkles } from 'lucide-react';
import QRCode from "react-qr-code";
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";

const QRGenerator = () => {
  const qrCode = useRef(null);
  const navigate = useNavigate();
  const previewCanvasRef = useRef(null);
  const [url, setUrl] = useState(""); // Manages the URL input
  const [isUrlEntered, setIsUrlEntered] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [wifiDetails, setWifiDetails] = useState({ ssid: "", password: "", encryption: "WPA" });
  const [textInput, setTextInput] = useState("");
  const [qrShape, setQrShape] = useState("square");
  const [selectedStyle, setSelectedStyle] = useState("neonGlow");
  const [inputType, setInputType] = useState("url");
  const [selectedPattern, setSelectedPattern] = useState("default");
  const [logo, setLogo] = useState(null); // For managing logo
  const [logoSize, setLogoSize] = useState(0.5); // Separate state for logo size
  
  const handleSendSMS = () => {
    if (smsDetails.number && smsDetails.message) {
      // Navigate to /sms page with query params
      navigate(`/sms?number=${encodeURIComponent(smsDetails.number)}&message=${encodeURIComponent(smsDetails.message)}`);
    } else {
      alert('Please provide both phone number and message.');
    }
  };
  const [calendarDetails, setCalendarDetails] = useState({
    summary: "",
    startTime: "",
    endTime: "",
    location: "",
  });
  const [geoDetails, setGeoDetails] = useState({
    latitude: "",
    longitude: "",
  });
  const [smsDetails, setSmsDetails] = useState({
    phoneNumber: "",
    message: "",
  });
  const [emailDetails, setEmailDetails] = useState({
    emailAddress: "",
    subject: "",
    body: "",
  });
  
  const [phoneDetails, setPhoneDetails] = useState({
    phoneNumber: "",
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [qrConfig, setQrConfig] = useState({
    url: "",
    size: 200,
    shape: 'square',
    clipPath: 'none',
    dotsOption: {
      type: 'dots',
      color: '#000000'
    },
    background: "#FFFFFF",
    gradientType: "linear",
    gradientStart: "#000000",
    gradientMiddle: "#FF4081",
    gradientEnd: "#4CAF50",
    dotsType: "rounded",
    eyeShape: "rounded",
    eyeInnerColor: "#000000",
    eyeOuterColor: "#000000",
    stickerStyle: "none",
    stickerType: "classic",
    stickerSize: "medium",
    stickerOpacity: 0.8,
    logo: null,
    logoSize:200,
    sticker: null,
    pattern: "default",
    patternStyles: "diamond",
    patternConfigs: "default",
    qrPositionX: 0.5, // Center by default (percentage relative to sticker size)
    qrPositionY: 0.5,
    qrSize: 150
  });
  
  const renderEyeShapes = {
    rounded: (x, y, size, innerColor, outerColor) => (
      <>
        <rect 
          x={x} 
          y={y} 
          width={size} 
          height={size} 
          fill={outerColor} 
          rx={size/4} 
          ry={size/4} 
        />
        <rect 
          x={x + size/4} 
          y={y + size/4} 
          width={size/2} 
          height={size/2} 
          fill={innerColor} 
          rx={size/8} 
          ry={size/8} 
        />
      </>
    ),
    square: (x, y, size, innerColor, outerColor) => (
      <>
        <rect 
          x={x} 
          y={y} 
          width={size} 
          height={size} 
          fill={outerColor} 
        />
        <rect 
          x={x + size/4} 
          y={y + size/4} 
          width={size/2} 
          height={size/2} 
          fill={innerColor} 
        />
      </>
    ),
    hexagon: (x, y, size, innerColor, outerColor) => {
      const points = [
        `${x + size/2},${y}`,
        `${x + size},${y + size/4}`,
        `${x + size},${y + 3*size/4}`,
        `${x + size/2},${y + size}`,
        `${x},${y + 3*size/4}`,
        `${x},${y + size/4}`
      ].join(' ');

      const innerPoints = [
        `${x + size/2},${y + size/4}`,
        `${x + 3*size/4},${y + size/2}`,
        `${x + size/2},${y + 3*size/4}`,
        `${x + size/4},${y + size/2}`
      ].join(' ');

      return (
        <>
          <polygon 
            points={points} 
            fill={outerColor}
          />
          <polygon 
            points={innerPoints} 
            fill={innerColor}
          />
        </>
      );
    },
    flower: (x, y, size, innerColor, outerColor) => (
      <>
        <path
          d={`
            M${x + size/2},${y} 
            Q${x + size},${y + size/2} ${x + size/2},${y + size} 
            Q${x},${y + size/2} ${x + size/2},${y}
            M${x + size/2},${y}
            Q${x},${y + size/2} ${x + size/2},${y + size}
            Q${x + size},${y + size/2} ${x + size/2},${y}
          `}
          fill={outerColor}
        />
        <circle 
          cx={x + size/2} 
          cy={y + size/2} 
          r={size/4} 
          fill={innerColor}
        />
      </>
    )
  };



  useEffect(() => {
    const patternConfig = patternConfigs[selectedPattern] || patternConfigs.default;
  
    const qrCodeOptions = {
      width: qrConfig.size,
      height: qrConfig.size,
      data: qrConfig.url || "https://example.com",
      dotsOptions: {
        type: patternConfig.dotsOptions?.type || "rounded", // Use selected pattern or fallback
        color: qrConfig.dotColor || "#000000",
        gradient: qrConfig.gradientType
          ? {
              type: qrConfig.gradientType,
              colorStops: [
                { offset: 0, color: qrConfig.gradientStart || "#000000" },
                { offset: 0.5, color: qrConfig.gradientMiddle || "#333333" },
                { offset: 1, color: qrConfig.gradientEnd || "#666666" },
              ],
            }
          : undefined,
      },
      cornersSquareOptions: {
        type: qrConfig.eyeShape || "square", // Use default shape if none selected
        color: qrConfig.eyeOuterColor || "#000000",
      },
      cornersDotOptions: {
        type: qrConfig.eyeShape || "square",
        color: qrConfig.eyeInnerColor || "#000000",
      },
      backgroundOptions: {
        color: qrConfig.background || "#ffffff",
      },
      imageOptions: {
        crossOrigin: "anonymous",             // Ensures the logo can be loaded from external sources
        image: qrConfig.logo || null,        // Logo image
        margin: qrConfig.logoMargin || 0.1,    // Adds spacing around the logo
        scale: qrConfig.logoScale || 0.3,    // Adjusted scale for visibility
        cornerRadius: 10,                    // Adds rounded corners to the logo for aesthetic appeal
        hideBackgroundDots: true,            // Ensures dots are not visible beneath the logo
        imageResolution: 500,                // Increased resolution for better clarity
        mode: "detailed",                    // Use detailed rendering for the logo
        sharp: true,                         // Enhances sharpness for a clearer appearance
      },
      
      stickerOptions: qrConfig.sticker
        ? {
            data: qrConfig.sticker,
            position: {
              x: 0.5,
              y: 0.5,
            },
            size: 100, // Adjust sticker size as needed
          }
        : null, // Include sticker options if a sticker is selected
    };
  
    try {
      // Initialize or update QRCodeStyling instance
      if (!qrCode.current) {
        qrCode.current = new QRCodeStyling(qrCodeOptions);
      } else {
        qrCode.current.update(qrCodeOptions);
      }
  
      // Render QR code
      if (canvasRef.current) {
        canvasRef.current.innerHTML = ""; // Clear previous QR code
        qrCode.current.append(canvasRef.current); // Append updated QR code
      }
  
      // Update logo separately
      if (qrConfig.logo) {
        qrCode.current.update({
          image: qrConfig.logo,
        });
      }
  
      // Validate and render sticker placement
      if (qrConfig.sticker) {
        updatePreview(); // Adjust this function to validate and re-render sticker placement
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
    updatePreview();
  }, [qrConfig, selectedPattern,logoSize,logo]);

  const shapeOptions = {
    square: {
      name: "Square",
      icon: Square,
      clipPath: "none"
    },
    circle: {
      name: "Circle",
      icon: Circle,
      clipPath: "none"
    },
    hexagon: {
      name: "Hexagon",
      icon: Hexagon,
      clipPath: "none"
    },
    triangle: {
      name: "Triangle",
      icon: Triangle,
      clipPath: "none"
    }
  };
  const patternStyles = {
    dots: {
      preview: "⚫",
      name: "Classic Dots",
      description: "Traditional circular dot pattern"
    },
    squares: {
      preview: "⬛",
      name: "Geometric Squares",
      description: "Sharp, modern square design"
    },
    rounded: {
      preview: "○",
      name: "Soft Rounded",
      description: "Gentle, smooth-edged dots"
    },
    diamond: {
      preview: "◈",
      name: "Diamond Cut",
      description: "Elegant diamond-shaped pattern"
    },
    // New patterns
    gradient: {
      preview: "🌈",
      name: "Gradient Flow",
      description: "Smooth color transition"
    },
    tech: {
      preview: "⚡",
      name: "Tech Circuit",
      description: "High-tech digital style"
    },
    organic: {
      preview: "🍃",
      name: "Nature Waves",
      description: "Fluid, organic pattern"
    },
    pixel: {
      preview: "🔲",
      name: "Pixel Grid",
      description: "Retro 8-bit inspired design"
    }
  };
  const patternTypeMapping = {
    dots: "dots",
    squares: "square",
    rounded: "rounded",
    diamond: "diamond",
    gradient: "square", // You can adjust these mappings
    tech: "square",
    organic: "rounded",
    pixel: "square"
  };
  
  const patternConfigs = {
    default: {
      dotsOptions: { type: "rounded" }
    },
    dots: {
      dotsOptions: {
        type: "dots",
        color: "#000000",
        gradient: {
          type: "radial",
          colorStops: [
            { offset: 0, color: "#000000" },
            { offset: 0.5, color: "#666666" },
            { offset: 1, color: "#000000" }
          ]
        }
      }
    },
    squares: {
      dotsOptions: {
        type: "square",
        color: "#000000",
        gradient: {
          type: "linear",
          rotation: 45,
          colorStops: [
            { offset: 0, color: "#000000" },
            { offset: 0.5, color: "#333333" },
            { offset: 1, color: "#000000" }
          ]
        }
      }
    },
    rounded: {
      dotsOptions: {
        type: "rounded",
        color: "#000000",
        gradient: {
          type: "radial",
          colorStops: [
            { offset: 0, color: "#000000" },
            { offset: 0.5, color: "#666666" },
            { offset: 1, color: "#000000" }
          ]
        }
      }
    },
    diamond: {
      dotsOptions: {
        type: "diamond",
        color: "#000000",
        gradient: {
          type: "linear",
          rotation: 45,
          colorStops: [
            { offset: 0, color: "#000000" },
            { offset: 1, color: "#666666" }
          ]
        }
      }
    },
    // New pattern configurations
    gradient: {
      dotsOptions: {
        type: "rounded",
        color: "#000000",
        gradient: {
          type: "linear",
          rotation: 90,
          colorStops: [
            { offset: 0, color: "#3498db" },
            { offset: 0.5, color: "#8e44ad" },
            { offset: 1, color: "#e74c3c" }
          ]
        }
      }
    },
    tech: {
      dotsOptions: {
        type: "square",
        color: "#2ecc71",
        gradient: {
          type: "linear",
          rotation: 45,
          colorStops: [
            { offset: 0, color: "#2ecc71" },
            { offset: 1, color: "#3498db" }
          ]
        }
      }
    },
    organic: {
      dotsOptions: {
        type: "rounded",
        color: "#2ecc71",
        gradient: {
          type: "radial",
          colorStops: [
            { offset: 0, color: "#27ae60" },
            { offset: 1, color: "#2ecc71" }
          ]
        }
      }
    },
    pixel: {
      dotsOptions: {
        type: "square",
        color: "#34495e",
        gradient: {
          type: "linear",
          rotation: 135,
          colorStops: [
            { offset: 0, color: "#2c3e50" },
            { offset: 1, color: "#34495e" }
          ]
        }
      }
    }
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const presetStyles = {
    neonGlow: {
      name: "Neon Glow",
      config: {
        dotsType: "rounded",
        gradientType: "radial",
        gradientStart: "#00ff87",
        gradientMiddle: "#60efff",
        gradientEnd: "#00ff87",
        eyeShape: "rounded",
        eyeInnerColor: "#00ff87",
        eyeOuterColor: "#60efff",
        background: "#1a1a1a"
      }
    },
    pixelArt: {
      name: "Pixel Art",
      config: {
        dotsType: "square",
        gradientType: "linear",
        gradientStart: "#FF71CE",
        gradientMiddle: "#B967FF",
        gradientEnd: "#01CDFE",
        eyeShape: "square",
        eyeInnerColor: "#FF71CE",
        eyeOuterColor: "#01CDFE",
        background: "#ffffff"
      }
    },
    geometric: {
      name: "Geometric",
      config: {
        dotsType: "diamond",
        gradientType: "linear",
        gradientStart: "#FF9671",
        gradientMiddle: "#FFC75F",
        gradientEnd: "#F9F871",
        eyeShape: "diamond",
        eyeInnerColor: "#FF9671",
        eyeOuterColor: "#F9F871",
        background: "#ffffff"
      }
    },
    minimalist: {
      name: "Minimalist",
      config: {
        dotsType: "dots",
        gradientType: "linear",
        gradientStart: "#000000",
        gradientMiddle: "#333333",
        gradientEnd: "#666666",
        eyeShape: "dot",
        eyeInnerColor: "#000000",
        eyeOuterColor: "#000000",
        background: "#ffffff"
      }
    },
    rainbow: {
      name: "Rainbow Wave",
      config: {
        dotsType: "rounded",
        gradientType: "linear",
        gradientStart: "#FF0000",
        gradientMiddle: "#00FF00",
        gradientEnd: "#0000FF",
        eyeShape: "rounded",
        eyeInnerColor: "#FF0000",
        eyeOuterColor: "#0000FF",
        background: "#ffffff"
      }
    },
    cosmic: {
      name: "Cosmic",
      config: {
        dotsType: "rounded",
        gradientType: "radial",
        gradientStart: "#FF00E4",
        gradientMiddle: "#AD00FF",
        gradientEnd: "#7000FF",
        eyeShape: "rounded",
        eyeInnerColor: "#FF00E4",
        eyeOuterColor: "#7000FF",
        background: "#120338"
      }
    },
    retro: {
      name: "Retro",
      config: {
        dotsType: "square",
        gradientType: "linear",
        gradientStart: "#FF6B6B",
        gradientMiddle: "#FFD93D",
        gradientEnd: "#6BCB77",
        eyeShape: "square",
        eyeInnerColor: "#FF6B6B",
        eyeOuterColor: "#6BCB77",
        background: "#F4EEE0"
      }
    },
    aqua: {
      name: "Aqua Dream",
      config: {
        dotsType: "dots",
        gradientType: "radial",
        gradientStart: "#00B4D8",
        gradientMiddle: "#48CAE4",
        gradientEnd: "#90E0EF",
        eyeShape: "dot",
        eyeInnerColor: "#00B4D8",
        eyeOuterColor: "#90E0EF",
        background: "#CAF0F8"
      }
    }
  };


  const canvasRef = useRef(null);
  const STICKER_IMAGES = [
    "/sticker.png",
    "/stickers3.png",
    "/stickre4.png",
    "/sticker5.png",
    "/sticker7.png",
    "/sticker8.png",
    "/sticker9.png",
    "/sticker10.png",
    "/sticker11.png",
    "/sticker12.png",
    "/sticker13.png",
    "/sticker14.png",
    "/sticker15.png",
    "/sticker18.png",
    "/sticker19.png",












  ];
  const STICKER_POSITIONS = [
    { x: 0.5, y: 0.5 },  // First sticker ("/sticker.png")
    { x: 0.35, y: 0.5 },  // Centered QR code sticker ("/sticker4.png")
    { x: 0.45, y: 0.65 },  // Third sticker ("/stickre4.png")
    { x: 0.5, y: 0.5 },  // Fourth sticker ("/stickers/flore.png")
    { x: 0.5, y: 0.5 },
    { x: 0.5, y: 0.5 },
    { x: 0.5, y: 0.5 },
    { x: 0.5, y: 0.5 },
    { x: 0.5, y: 0.5 },
    { x: 0.5, y: 0.3 },
    { x: 0.5, y: 0.5 },
    { x: 0.65, y: 0.7 },
    { x: 0.8, y: 0.85 },
    { x: 0.5, y: 0.3 },
    { x: 0.5, y: 0.35 },



  ];



  // Function to handle sticker selection

  const handleStickerSelect = (stickerPath, index) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const size = 500;
      canvas.width = size;
      canvas.height = size;

      // Draw sticker, scaling and centering
      const scale = Math.min(size / img.width, size / img.height);
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      const x = (size - scaledWidth) / 2;
      const y = (size - scaledHeight) / 2;

      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

      const stickerDataUrl = canvas.toDataURL('image/png');

      // Get the predefined position for this sticker
      const { x: posX, y: posY } = STICKER_POSITIONS[index] || { x: 0.5, y: 0.5 };

      setQrConfig((prev) => ({
        ...prev,
        sticker: stickerDataUrl,
        stickerSize: 'medium',
        stickerStyle: 'square',
        qrPositionX: posX,    // Set fixed X position
        qrPositionY: posY,    // Set fixed Y position
      }));
    };

    img.onerror = (error) => {
      console.error('Error loading sticker image:', error);
    };

    img.src = stickerPath;
  };


  const updatePreview = () => {
    if (!previewCanvasRef.current) return;

    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const canvasSize = 500; // Fixed canvas size
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Clear the canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw QR code background
    ctx.fillStyle = qrConfig.background;
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw QR code (placeholder for QR code, replace with actual QR generation)
    const qrSize = qrConfig.qrSize;
    const qrX = (canvasSize - qrSize) / 2;
    const qrY = (canvasSize - qrSize) / 2;
    ctx.fillStyle = "#000";
    ctx.fillRect(qrX, qrY, qrSize, qrSize);

    // Draw the logo if available
    if (qrConfig.logo) {
      const logoImg = new Image();
      logoImg.onload = () => {
        const logoSize = (qrConfig.logoSize / 50) * qrSize; // Scale logo size relative to QR code
        const logoX = qrX + (qrSize - logoSize) / 2;
        const logoY = qrY + (qrSize - logoSize) / 2;

        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
      };
      logoImg.src = qrConfig.logo;
    }
  };
  
  // Trigger updatePreview when logoSize or qrConfig changes
  useEffect(() => {
    updatePreview();
  }, [qrConfig.logoSize, qrConfig.qrSize, qrConfig.logo]);


  // Helper function for hexagon points calculation
  const calculateHexagonPoints = (x, y, size) => [
    [x + size / 2, y],
    [x + size, y + size / 4],
    [x + size, y + (3 * size) / 4],
    [x + size / 2, y + size],
    [x, y + (3 * size) / 4],
    [x, y + size / 4],
  ];


  const designStyles = {
    modern: {
      dotsType: "rounded",
      gradientType: "linear",
      gradientStart: "#FF416C",
      gradientMiddle: "#FF4B2B",
      gradientEnd: "#FF4B2B",
    },
    neon: {
      dotsType: "rounded",
      gradientType: "radial",
      gradientStart: "#12c2e9",
      gradientMiddle: "#c471ed",
      gradientEnd: "#f64f59",
    },
    vintage: {
      dotsType: "diamond",
      gradientType: "linear",
      gradientStart: "#C6FFDD",
      gradientMiddle: "#FBD786",
      gradientEnd: "#f7797d",
    },
    minimal: {
      dotsType: "square",
      gradientType: "linear",
      gradientStart: "#000000",
      gradientEnd: "#434343",
    },
    cyber: {
      dotsType: "diamond",
      gradientType: "linear",
      gradientStart: "#FF00E4",
      gradientMiddle: "#00FFE0",
      gradientEnd: "#00FF85",
    },
    elegant: {
      dotsType: "rounded",
      gradientType: "linear",
      gradientStart: "#8E2DE2",
      gradientMiddle: "#4A00E0",
      gradientEnd: "#4A00E0",
    },
    sunset: {
      dotsType: "rounded",
      gradientType: "linear",
      gradientStart: "#FF512F",
      gradientMiddle: "#F09819",
      gradientEnd: "#FF512F",
    }
  };

  const stickerTypes = {
    classic: {
      borderRadius: "8px",
      shadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "none",
      background: "white"
    },
    polaroid: {
      borderRadius: "2px",
      shadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      border: "none",
      padding: "16px 16px 40px 16px",
      background: "white"
    },
    stamp: {
      borderRadius: "2px",
      border: "2px dashed #333",
      padding: "12px",
      background: "#f8f8f8"
    },
    floating: {
      borderRadius: "12px",
      shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)"
    },
    minimal: {
      borderRadius: "0",
      border: "1px solid #e2e2e2",
      background: "white"
    },
    neon: {
      borderRadius: "12px",
      border: "2px solid rgba(255, 255, 255, 0.2)",
      background: "rgba(0, 0, 0, 0.8)",
      boxShadow: "0 0 20px rgba(66, 220, 219, 0.3), inset 0 0 20px rgba(66, 220, 219, 0.3)"
    }
  };

  const stickerSizes = {
    small: {
      containerSize: "w-64 h-64",
      padding: "p-6",
    },
    medium: {
      containerSize: "w-80 h-80",
      padding: "p-8",
    },
    large: {
      containerSize: "w-96 h-96",
      padding: "p-10",
    },
    xlarge: {
      containerSize: "w-[32rem] h-[32rem]",
      padding: "p-12",
    },
  };


  const stickerStyles = {
    none: null,
    gloss: {
      type: "radial",
      colorStops: [
        { offset: 0, color: "rgba(255,255,255,0.8)" },
        { offset: 0.5, color: "rgba(255,255,255,0)" },
      ],
    },
    watercolor: {
      type: "radial",
      colorStops: [
        { offset: 0, color: "rgba(255,182,193,0.3)" },
        { offset: 1, color: "rgba(255,182,193,0)" },
      ],
    },
    metallic: {
      type: "linear",
      colorStops: [
        { offset: 0, color: "rgba(192,192,192,0.4)" },
        { offset: 0.5, color: "rgba(255,255,255,0.2)" },
        { offset: 1, color: "rgba(192,192,192,0.4)" },
      ],
    },
    rainbow: {
      type: "linear",
      colorStops: [
        { offset: 0, color: "rgba(255,0,0,0.2)" },
        { offset: 0.33, color: "rgba(0,255,0,0.2)" },
        { offset: 0.66, color: "rgba(0,0,255,0.2)" },
        { offset: 1, color: "rgba(255,0,0,0.2)" },
      ],
    },
    frost: {
      type: "radial",
      colorStops: [
        { offset: 0, color: "rgba(255,255,255,0.4)" },
        { offset: 1, color: "rgba(230,240,255,0.1)" },
      ],
    }
  };
  useEffect(() => {
    const patternConfig = patternConfigs[qrConfig.pattern] || patternConfigs.default;
    const qrCodeOptions = {
      width: qrConfig.size,
      height: qrConfig.size,
      data: qrConfig.url || "https://example.com",
      dotsOptions: {
        type: patternConfig.dotsOptions?.type || "rounded",
        color: patternConfig.dotsOptions?.color || qrConfig.dotColor || "#000000",
        gradient: patternConfig.dotsOptions?.gradient || undefined,
        scale: qrConfig.dotsOptions?.scale || 1.0,
      },
      cornersSquareOptions: {
        type: qrConfig.eyeShape || "square",
        color: qrConfig.eyeOuterColor || "#000000",
      },
      cornersDotOptions: {
        type: qrConfig.eyeShape || "square",
        color: qrConfig.eyeInnerColor || "#000000",
      },
      backgroundOptions: {
        color: qrConfig.background || "#ffffff",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10,
        scale: qrConfig.logo ? 0.4 : 0,
      },
      shape: qrConfig.shape,
      shapeOptions: qrConfig.shapeOptions
    };
  
    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling(qrCodeOptions);
    } else {
      qrCode.current.update(qrCodeOptions);
    }
  
    // Handle logo separately to prevent conflicts
    if (qrConfig.logo) {
      qrCode.current.update({
        image: qrConfig.logo,
      });
    }
  
    // Render QR code
    if (canvasRef.current) {
      canvasRef.current.innerHTML = ""; // Clear previous QR code
      qrCode.current.append(canvasRef.current); // Append updated QR code
  
      // Shape-specific styling
      switch (qrConfig.shape) {
        case 'circle':
          canvasRef.current.style.clipPath = 'circle(50%)';
          break;
        case 'triangle':
          canvasRef.current.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
          break;
        case 'hexagon':
          canvasRef.current.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
          break;
        default:
          canvasRef.current.style.clipPath = 'none';
      }
  
      // Border and additional styling
      canvasRef.current.style.borderRadius = '50%';
      canvasRef.current.style.border = `${qrConfig.borderWidth || 2}px solid ${qrConfig.borderColor || '#000000'}`;
      canvasRef.current.style.boxSizing = 'border-box';
    }
  
    // Ensure sticker doesn't obscure essential parts
    if (qrConfig.sticker) {
      updatePreview();
    }
  }, [qrConfig]);

  const handleAnalyticsOption = async () => {
    const userConfirmation = window.confirm(
      "Do you want to enable analytics for this QR Code? This will mask the URL and track clicks."
    );
  
    if (userConfirmation) {
      try {
        const maskedUrl = await generateMaskedUrl(qrConfig.url);
        setQrConfig((prev) => ({ ...prev, url: maskedUrl }));
        await saveQrCodeWithAnalytics(maskedUrl);
        alert("Analytics enabled. QR code URL is masked and tracking is active.");
      } catch (error) {
        console.error("Error enabling analytics:", error);
        alert("Failed to enable analytics. Please try again.");
      }
    } else {
      alert("Analytics not enabled.");
    }
  };
  
  const generateMaskedUrl = async (originalUrl) => {
    try {
      const response = await fetch("http://localhost:3000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl }),
      });
  
      const data = await response.json();
      return data.maskedUrl; // The masked URL returned by your server
    } catch (error) {
      console.error("Error generating masked URL:", error);
      throw new Error("Could not generate masked URL");
    }
  };
  
  const saveQrCodeWithAnalytics = async (maskedUrl) => {
    try {
      await fetch("http://localhost:3000/save-qr", { // Adjust API URL to match your backend
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: maskedUrl, config: qrConfig }),
      });
    } catch (error) {
      console.error("Error saving QR code analytics:", error);
      throw new Error("Could not save QR code with analytics");
    }
  };
  
  const handleGenerateQrCode = async () => {
    try {
      const maskedUrl = await generateMaskedUrl(qrConfig.url);
      setQrConfig((prev) => ({
        ...prev,
        url: maskedUrl, // Update QR code configuration with the masked URL
      }));
      alert("Masked URL generated and QR code updated for tracking.");
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert("Failed to generate QR code. Please try again.");
    }
  };
  
  const handleDownload = async () => {
    try {
      await handleAnalyticsOption(); // Prompt user for analytics
      if (qrConfig.sticker && previewCanvasRef.current) {
        // Download custom QR code with sticker
        const link = document.createElement("a");
        link.download = "custom-qr-code.png";
        link.href = previewCanvasRef.current.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (qrCode.current) {
        // Download standard QR code
        qrCode.current.download({ extension: "png" });
      }
    } catch (error) {
      console.error("Error during QR code download:", error);
      alert("Failed to download QR code. Please try again.");
    }
  };

  const StylesTab = ({ qrConfig, setQrConfig, setQrShape }) => {
    const handleShapeChange = (shape) => {
      setQrShape(shape); // Update the shape state

      // Remove the size modification
      setQrConfig((prev) => ({
        ...prev,
        shape, // Only update the shape
        clipPath: shapeOptions[shape]?.clipPath || "none",
        dotsOptions: {
          ...prev.dotsOptions,
          scale: shape === "circle" || shape === "triangle" || shape === "hexagon" ? 1.05 : 1.0,
        },
      }));
    };

    // Rest of your component...



    // Add the logic to update dotsOptions and other specific configurations only when needed:
    useEffect(() => {
      applyShapeToCanvas(); // Ensure canvas reflects the selected shape
    }, [qrShape]);

    const applyShapeToCanvas = () => {
      if (previewCanvasRef.current) {
        const canvas = previewCanvasRef.current;
        canvas.style.clipPath = shapeOptions[qrShape]?.clipPath || 'none'; // Apply the selected clipPath
      }
    };



    const handlePatternChange = (pattern) => {
      setQrConfig((prev) => ({
        ...prev,
        pattern, // Update the pattern in qrConfig
        // Remove the size increase logic unless you specifically want that
      }));
    };

    return (
      <div className="space-y-6">
        {/* Shape Selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-black">Shape</h3>
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(shapeOptions).map(([key, shape]) => {
              const Icon = shape.icon;
              return (
                <button
                  key={key}
                  onClick={() => handleShapeChange(key)}
                  className={`flex flex-col items-center p-3 rounded-lg border transition-all ${qrConfig.shape === key
                    ? "border-blue-500 bg-blue-900/20 text-blue-400"
                    : "border-gray-700 hover:border-blue-500/50 text-gray-400 hover:text-blue-400"
                    }`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <span className="text-xs">{shape.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pattern Selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-black">Pattern</h3>
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(patternStyles).map(([key, pattern]) => (
              <button
                key={key}
                onClick={() => handlePatternChange(key)}
                className={`flex flex-col items-center p-3 rounded-lg border transition-all ${qrConfig.pattern === key
                  ? "border-blue-500 bg-blue-900/20 text-blue-400"
                  : "border-gray-700 hover:border-blue-500/50 text-gray-400 hover:text-blue-400"
                  }`}
              >
                <span className="text-xl mb-2">{pattern.preview}</span>
                <span className="text-xs font-medium">{pattern.name}</span>
                <span className="text-xs text-gray-500 text-center mt-1">
                  {pattern.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Settings */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">QR Code Size</label>
          <input
            type="range"
            min="100"
            max="400"
            step="10"
            value={qrConfig.size}
            onChange={(e) =>
              setQrConfig((prev) => ({
                ...prev,
                size: Number(e.target.value)
              }))
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-sm text-gray-600 flex justify-between">
            <span>100</span>
            <span>{qrConfig.size}</span>
            <span>400</span>
          </div>
        </div>
        {/* Color Presets */}

      </div>
    );
  };


  // Preset styles data

  const applyShapeToCanvas = () => {
    if (previewCanvasRef.current) {
      const canvas = previewCanvasRef.current;
      canvas.style.clipPath = shapeOptions[qrShape]?.clipPath || 'none';
    }
  };

  useEffect(() => {
    applyShapeToCanvas();
  }, [qrShape]);


  const renderTabContent = () => {
    switch (activeTab) {
      case "shapes":
        return (
          <StylesTab
            qrConfig={qrConfig}
            setQrConfig={setQrConfig}
            setQrShape={setQrShape}  // Ensure this is passed
          />
        );




      case "basic":
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter URL"
              value={qrConfig.url}
              onChange={(e) => setQrConfig((prev) => ({ ...prev, url: e.target.value }))}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
            />
            <div className="space-y-2">
              <label className="block">Size: {qrConfig.size}px</label>
              <input
                type="range"
                min="50"
                max="400"
                step="50"
                value={qrConfig.size}
                onChange={(e) => setQrConfig((prev) => ({ ...prev, size: Number(e.target.value) }))}
                className="w-full"
              />
            </div>
            <label className="block">
              Background:
              <input
                type="color"
                value={qrConfig.background}
                onChange={(e) => setQrConfig((prev) => ({ ...prev, background: e.target.value }))}
                className="ml-2"
              />
            </label>
          </div>
        );

      case "design":
        return (
          <div className="space-y-4">
            <select
              value={qrConfig.dotsType}
              onChange={(e) => setQrConfig((prev) => ({ ...prev, dotsType: e.target.value }))}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
            >
              <option value="rounded">Rounded</option>
              <option value="square">Square</option>
              <option value="diamond">Diamond</option>
              <option value="dots">Dots</option>
            </select>

            <select
              value="custom"
              onChange={(e) => {
                if (e.target.value !== "custom") {
                  setQrConfig((prev) => ({ ...prev, ...designStyles[e.target.value] }));
                }
              }}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
            >
              <option value="custom">Custom</option>
              <option value="modern">Modern</option>
              <option value="neon">Neon</option>
              <option value="vintage">Vintage</option>
              <option value="minimal">Minimal</option>
              <option value="cyber">Cyber</option>
              <option value="elegant">Elegant</option>
              <option value="sunset">Sunset</option>
            </select>

            <select
              value={qrConfig.gradientType}
              onChange={(e) => setQrConfig((prev) => ({ ...prev, gradientType: e.target.value }))}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>

            <div className="space-y-2">
              <label className="block">
                Gradient Start:
                <input
                  type="color"
                  value={qrConfig.gradientStart}
                  onChange={(e) => setQrConfig((prev) => ({ ...prev, gradientStart: e.target.value }))}
                  className="ml-2"
                />
              </label>
              <label className="block">
                Gradient Middle:
                <input
                  type="color"
                  value={qrConfig.gradientMiddle}
                  onChange={(e) => setQrConfig((prev) => ({ ...prev, gradientMiddle: e.target.value }))}
                  className="ml-2"
                />
              </label>
              <label className="block">
                Gradient End:
                <input
                  type="color"
                  value={qrConfig.gradientEnd}
                  onChange={(e) => setQrConfig((prev) => ({ ...prev, gradientEnd: e.target.value }))}
                  className="ml-2"
                />
              </label>
            </div>
          </div>
        );

        case "eyes":
          return (
            <div className="space-y-4">
              <select
                value={qrConfig.eyeShape}
                onChange={(e) => setQrConfig((prev) => ({
                  ...prev,
                  eyeShape: e.target.value
                }))}
                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
              >
                <option value="rounded">Rounded</option>
                <option value="square">Square</option>
                <option value="hexagon">Hexagon</option>
                <option value="flower">Flower</option>
              </select>
        
              <label className="block">
                Eye Inner Color:
                <input
                  type="color"
                  value={qrConfig.eyeInnerColor}
                  onChange={(e) => setQrConfig((prev) => ({
                    ...prev,
                    eyeInnerColor: e.target.value
                  }))}
                  className="ml-2"
                />
              </label>
        
              <label className="block">
                Eye Outer Color:
                <input
                  type="color"
                  value={qrConfig.eyeOuterColor}
                  onChange={(e) => setQrConfig((prev) => ({
                    ...prev,
                    eyeOuterColor: e.target.value
                  }))}
                  className="ml-2"
                />
              </label>
        {/* Logo Upload */}
        <div className="mb-4">
  {/* Logo Upload Input */}
  <label className="block mb-2 font-semibold">Upload Logo:</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setQrConfig((prev) => ({
            ...prev,
            logo: reader.result,
            logoSize: prev.logoSize || 100, // Increased size for better visibility
            logoScale: prev.logoScale || 0.8, // Increased scale for a larger logo
            logoMargin: 10, // Increased margin around the logo
          }));
        };
        reader.readAsDataURL(file);
      }
    }}
    className="w-full border p-2 rounded"
  />
</div>


{/* Logo Size Slider */}
{qrConfig.logo && (
  <div className="mb-4">
    <label className="block mb-2 font-semibold">Logo Size:</label>
    <input
      type="range"
      min="10"
      max="100"
      step="5"
      value={qrConfig.logoSize}
      onChange={(e) => {
        const newLogoSize = Number(e.target.value);
        setQrConfig((prev) => ({
          ...prev,
          logoSize: newLogoSize,
          logoScale: newLogoSize / 500, // Dynamically adjust scale
          logoMargin: Math.max(2, 12 - newLogoSize / 10), // Dynamic margin for spacing
        }));
      }}
      className="w-full cursor-pointer"
    />
    <div className="text-sm text-gray-600">
      Current Logo Size: <span className="font-semibold">{qrConfig.logoSize}%</span>
    </div>
  </div>
)}

              
            </div>
            
          );
      
      case "effects":
        return (
          <div className="space-y-4">


            <div className="space-y-2">
              <label className="block">Sticker Type:</label>
              <select
                value={qrConfig.stickerType}
                onChange={(e) => setQrConfig((prev) => ({ ...prev, stickerType: e.target.value }))}
                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
              >
                <option value="classic">Classic</option>
                <option value="polaroid">Polaroid</option>
                <option value="stamp">Stamp</option>
                <option value="floating">Floating</option>
                <option value="minimal">Minimal</option>
                <option value="neon">Neon</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block">Sticker Size:</label>
              <select
                value={qrConfig.stickerSize}
                onChange={(e) => setQrConfig((prev) => ({ ...prev, stickerSize: e.target.value }))}
                className="w-full p-2 rounded-md border border-white bg-gray-700 text-white"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xlarge">Extra Large</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block">Background Effect:</label>
              <select
                value={qrConfig.stickerStyle}
                onChange={(e) => setQrConfig((prev) => ({ ...prev, stickerStyle: e.target.value }))}
                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
              >
                <option value="none">None</option>
                <option value="gloss">Gloss</option>
                <option value="watercolor">Watercolor</option>
                <option value="metallic">Metallic</option>
                <option value="rainbow">Rainbow</option>
                <option value="frost">Frost</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block">
                Logo:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="ml-2 text-sm text-gray-300"
                />
              </label>
            </div>
          </div>
        );
      case "styles":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(presetStyles).map(([key, style]) => (
                <button
                  key={key}
                  onClick={() => setQrConfig(prev => ({
                    ...prev,
                    ...style.config
                  }))}
                  className="relative group overflow-hidden rounded-lg p-4 bg-gray-700 hover:bg-gray-600 transition-all duration-300"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span className="font-medium">{style.name}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="w-full h-2 rounded-full" style={{ background: style.config.gradientStart }} />
                      <div className="w-full h-2 rounded-full" style={{ background: style.config.gradientMiddle }} />
                      <div className="w-full h-2 rounded-full" style={{ background: style.config.gradientEnd }} />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="Shape Selector">
                Shape:
                <select
                  value={qrConfig.shape}
                  onChange={(e) => setQrConfig(prev => ({
                    ...prev,
                    shape: e.target.value
                  }))}
                  className="ml-2 text-sm text-gray-300"
                >
                  <option value="square">Square</option>
                  <option value="circle">Circle</option>
                  <option value="hexagon">Hexagon</option>
                  <option value="triangle">Triangle</option>
                </select>
              </label>

            </div>
          </div>
        );
      case "stickers":
        return (
          <div>
            {/* Size Bar for QR Code */}
            <div className="mb-4 flex items-center space-x-2">
              <label>QR Code Size:</label>
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={qrConfig.qrSize}
                onChange={(e) => {
                  setQrConfig(prev => ({
                    ...prev,
                    qrSize: Number(e.target.value)
                  }));
                }}
                className="w-40"
              />
              <span>{qrConfig.qrSize}px</span>
            </div>

            <div className="grid grid-cols-4 grid-rows-4 gap-4">
              {STICKER_IMAGES.map((sticker, index) => (
                <button
                  key={index}
                  onClick={() => handleStickerSelect(sticker, index)}
                  className="flex items-center justify-center w-32 h-32 aspect-square rounded-lg overflow-hidden border-2 border-gray-600 hover:border-blue-500 transition-colors"
                >
                  <img
                    src={sticker}
                    alt={`Sticker ${index + 1}`}
                    className="w-full h-full object-cover rounded-none"
                  />
                </button>
              ))}
            </div>
          </div>
        );


        ;

      // case "styles":
      //   return renderStylesTab();
      // default:
      //   return null;

    };
  }


  const getStickerStyle = () => {
    const style = stickerTypes[qrConfig.stickerType];
    const size = stickerSizes[qrConfig.stickerSize];

    return {
      padding: style.padding || size.padding,
      borderRadius: style.borderRadius,
      boxShadow: style.shadow || style.boxShadow || "none",
      border: style.border,
      background: style.background,
      backdropFilter: style.backdropFilter,
      transition: "all 0.3s ease-in-out",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  };

  
  const renderPreview = () => (
    qrConfig.sticker ? (
      <canvas
        ref={previewCanvasRef}
        className="shadow-lg"
        style={{
          display: 'block', // Ensures the canvas is treated as a block element
          margin: '0 auto', // Centers horizontally
          width: qrConfig.size,
          height: qrConfig.size,
          backgroundColor: 'white',
        }}
      />
    ) : (
      <div
        ref={canvasRef}
        className="shadow-lg"
        style={{
          display: 'block', // Ensures the div is treated as a block element
          margin: '0 auto', // Centers horizontally
          width: qrConfig.size,
          height: qrConfig.size,
          backgroundColor: 'white', // Background color for the div
        }}
      />
    )
);




// const handleContinue = () => {
//   if (url.trim()) {
//     setIsUrlEntered(true);
//   }
// };

// const handleDownload = () => {
//   // Add your QR code download logic here
//   console.log("Downloading QR code...");
// };

//pastebin

// const uploadToGist = async (text) => {
//   const githubToken = "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"; // Replace with your GitHub token
//   const gistData = {
//     description: "QR Code Text Storage",
//     public: true,
//     files: {
//       "long_text.txt": {
//         content: text,
//       },
//     },
//   };

//   const response = await fetch("https://api.github.com/gists", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${githubToken}`,
//     },
//     body: JSON.stringify(gistData),
//   });

//   if (response.ok) {
//     const gist = await response.json();
//     return gist.html_url; // Returns the Gist URL
//   } else {
//     throw new Error("Failed to upload text to GitHub Gist");
//   }
// };
const uploadToGist = async (text) => {
  const githubToken = "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"; // Replace with your GitHub token

  // Gist data
  const gistData = {
    description: "QR Code Text Storage",
    public: true,
    files: {
      "long_text.txt": {
        content: text,
      },
    },
  };

  // Fetch request to GitHub Gist API
  const response = await fetch("https://api.github.com/gists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${githubToken}`, // Correctly set the Authorization header
    },
    body: JSON.stringify(gistData),
  });

  // Handle response
  if (response.ok) {
    const gist = await response.json();
    return gist.html_url; // Return the URL of the newly created Gist
  } else {
    const errorDetails = await response.text(); // Capture error response for debugging
    console.error("Failed to create Gist:", errorDetails);
    throw new Error(`Failed to upload text to GitHub Gist. Status: ${response.status}`);
  }
};

const handleSms = () => {
  const smsUrl = `sms:${smsDetails.number}?body=${encodeURIComponent(smsDetails.message)}`;
  window.location.href = smsUrl; // This will open the SMS app with the pre-filled number and message
};

const handleContinue = async () => {
  try {
    let dataToEncode = "";

    switch (inputType) {
      case "text":
        dataToEncode =
          textInput.length > 500 ? await uploadToGist(textInput) : textInput;
        break;

      case "url":
        dataToEncode = url;
        break;

      case "wifi":
        dataToEncode = `WIFI:S:${wifiDetails.ssid};T:${wifiDetails.encryption};P:${wifiDetails.password};;`;
        break;

      case "email":
        dataToEncode = `MAILTO:${emailDetails.address}`;
        if (emailDetails.subject) {
          dataToEncode += `?subject=${encodeURIComponent(emailDetails.subject)}`;
          if (emailDetails.body) {
            dataToEncode += `&body=${encodeURIComponent(emailDetails.body)}`;
          }
        }
        break;

        case "sms":
          dataToEncode = `https://haqr.surge.sh?number=${encodeURIComponent(smsDetails.number)}&message=${encodeURIComponent(smsDetails.message)}`;
          break;

        
        
        
      case "phone":
        // For dialing, use 'TEL:' URL scheme
        dataToEncode = `tel:${phoneDetails.number}`;
        break;
        
        

      case "geo":
        dataToEncode = `geo:${geoDetails.latitude},${geoDetails.longitude}`;
        break;

      case "calendar":
        dataToEncode = `
BEGIN:VEVENT
SUMMARY:${calendarDetails.summary}
DTSTART:${calendarDetails.startTime}
DTEND:${calendarDetails.endTime}
LOCATION:${calendarDetails.location}
END:VEVENT`.trim();
        break;

      default:
        throw new Error("Unsupported input type");
    }

    setQrConfig((prev) => ({
      ...prev,
      url: dataToEncode,
    }));

    setIsUrlEntered(true);
  } catch (error) {
    alert("Error: " + error.message);
  }
};

return (
  <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        QR Code Customizer
      </h1>

      {!isUrlEntered ? (
        <div className="bg-gradient-to-b from-blue-200 via-indigo-200 to-white rounded-xl p-8 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-center text-black">
            Choose Input Type
          </h2>
          <div className="flex justify-center space-x-4 mb-4">
            {["url", "text", "wifi", "email", "phone", "sms", "geo", "calendar"].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded ${
                  inputType === type ? "bg-indigo-500 text-white" : "bg-gray-200 text-black"
                }`}
                onClick={() => setInputType(type)}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>

          {inputType === "url" && (
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your URL here"
              className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
            />
          )}

          {inputType === "text" && (
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter your text here"
              className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
            ></textarea>
          )}

          {inputType === "wifi" && (
            <div className="space-y-4">
              <input
                type="text"
                value={wifiDetails.ssid}
                onChange={(e) => setWifiDetails({ ...wifiDetails, ssid: e.target.value })}
                placeholder="SSID"
                className="w-full p-4 rounded-lg border-2 border-gray-300"
              />
              <input
                type="text"
                value={wifiDetails.password}
                onChange={(e) => setWifiDetails({ ...wifiDetails, password: e.target.value })}
                placeholder="Password"
                className="w-full p-4 rounded-lg border-2 border-gray-300"
              />
              <select
                value={wifiDetails.encryption}
                onChange={(e) => setWifiDetails({ ...wifiDetails, encryption: e.target.value })}
                className="w-full p-4 rounded-lg border-2 border-gray-300"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="">None</option>
              </select>
            </div>
          )}

{inputType === "email" && (
  <div className="space-y-4">
    <input
      type="email"
      value={emailDetails.address}
      onChange={(e) =>
        setEmailDetails({ ...emailDetails, address: e.target.value })
      }
      placeholder="Email Address"
      className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
    />
    <input
      type="text"
      value={emailDetails.subject}
      onChange={(e) =>
        setEmailDetails({ ...emailDetails, subject: e.target.value })
      }
      placeholder="Subject"
      className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
    />
    <textarea
      value={emailDetails.body}
      onChange={(e) =>
        setEmailDetails({ ...emailDetails, body: e.target.value })
      }
      placeholder="Message Body"
      className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
    ></textarea>
  </div>
)}

{inputType === "phone" && (
  <input
    type="tel"
    value={phoneDetails.number}
    onChange={(e) =>
      setPhoneDetails({ number: e.target.value })
    }
    placeholder="Phone Number"
    className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
  />
)}

{inputType === "sms" && (
        <div className="space-y-4">
          <input
            type="tel"
            value={smsDetails.number}
            onChange={(e) =>
              setSmsDetails({ ...smsDetails, number: e.target.value })
            }
            placeholder="Phone Number"
            className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
          />
          <textarea
            value={smsDetails.message}
            onChange={(e) =>
              setSmsDetails({ ...smsDetails, message: e.target.value })
            }
            placeholder="Message"
            className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
          ></textarea>
          <button
            onClick={handleSendSMS}
            className="w-full p-4 rounded-lg bg-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send SMS
          </button>
        </div>
      )}
    



          {inputType === "geo" && (
            <div className="space-y-4">
              <input
                type="text"
                value={geoDetails.latitude}
                onChange={(e) => setGeoDetails({ ...geoDetails, latitude: e.target.value })}
                placeholder="Latitude"
                className="w-full p-4 rounded-lg border-2 border-gray-300"
              />
              <input
                type="text"
                value={geoDetails.longitude}
                onChange={(e) => setGeoDetails({ ...geoDetails, longitude: e.target.value })}
                placeholder="Longitude"
                className="w-full p-4 rounded-lg border-2 border-gray-300"
              />
            </div>
          )}

          {inputType === "calendar" && (
            <div className="space-y-4">
              <input
                type="text"
                value={calendarDetails.summary}
                onChange={(e) => setCalendarDetails({ ...calendarDetails, summary: e.target.value })}
                placeholder="Event Summary"
                className="w-full p-4 rounded-lg border-2 border-gray-300"
              />
              <input
                type="datetime-local"
                value={calendarDetails.startTime}
                onChange={(e) => setCalendarDetails({ ...calendarDetails, startTime: e.target.value })}
                placeholder="Start Time"
                className="w-full p-4 rounded-lg border-2 border-gray-300"
              />
              <input
                type="datetime-local"
                value={calendarDetails.endTime}
                onChange={(e) => setCalendarDetails({ ...calendarDetails, endTime: e.target.value })}
                placeholder="End Time"
                className="w-full p-4 rounded-lg border-2 border-gray-300"
              />
              <input
                type="text"
                value={calendarDetails.location}
                onChange={(e) => setCalendarDetails({ ...calendarDetails, location: e.target.value })}
                placeholder="Location"
                className="w-full p-4 rounded-lg border-2 border-gray-300"
              />
            </div>
          )}

          <button
            onClick={handleContinue}
            className="mt-4 w-full bg-indigo-500 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-md"
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-b from-blue-200 via-indigo-200 to-white rounded-xl p-8 shadow-lg">
            <div className="mb-4">
              <p className="text-base font-medium italic text-black">
                Custom QR Code Generator
              </p>
            </div>
            <div className="mb-6">
              <div className="flex border-b-2 border-gray-200 mb-6 overflow-x-auto">
                {["Basic", "Styles", "Design", "Eyes", "Effects", "Stickers", "Shapes"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-6 py-3 text-base font-semibold transition-colors duration-300 ${
                      activeTab === tab.toLowerCase()
                        ? "border-b-4 border-indigo-500 text-indigo-500"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {renderTabContent()}
            </div>
          </div>

          <div className="bg-gradient-to-b from-blue-200 via-indigo-200 to-white p-8 shadow-lg">
            <h2 className="text-m font-semibold mb-4 text-center text-black">
              Preview
            </h2>
            {renderPreview()}
            <div className="mt-4 text-center text-sm text-black">
              <p>Scan to test the QR code</p>
              {url && (
                <p className="mt-2">
                  URL: <span className="text-indigo-200">{url}</span>
                </p>
              )}
            </div>
            <button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2 shadow-md"
            >
              Download QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default QRGenerator;

