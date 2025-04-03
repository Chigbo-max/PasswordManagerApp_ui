import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './securityTipsCarousel.module.css';

const tips = [
    {
        title: "Use Unique Passwords",
        content: "Never reuse passwords across different sites. If one gets compromised, all your accounts are at risk.",
        icon: "🔑"
    },
    // {
    //     title: "Enable 2FA",
    //     content: "Two-factor authentication adds an extra layer of security beyond just passwords.",
    //     icon: "🛡️"
    // },
    {
        title: "Beware of Phishing",
        content: "Always check URLs before entering credentials. Legitimate sites won't ask for passwords via email.",
        icon: "🎣"
    },
    {
        title: "Regular Updates",
        content: "Update your passwords every 3-6 months, especially for sensitive accounts.",
        icon: "🔄"
    },
    {
        title: "Password Manager",
        content: "Using a password manager helps generate and store complex passwords securely.",
        icon: "📱"
    }
];

const SecurityTipsCarousel = () => {
    const [currentTip, setCurrentTip] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setCurrentTip((prev) => (prev + 1) % tips.length);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const nextTip = () => {
        setCurrentTip((prev) => (prev + 1) % tips.length);
        setIsAutoPlaying(false);
    };

    const prevTip = () => {
        setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
        setIsAutoPlaying(false);
    };

    return (
        <div className={styles.carousel}>
            <div className={styles.tipContent}>
                <div className={styles.tipIcon}>{tips[currentTip].icon}</div>
                <div>
                    <h4>{tips[currentTip].title}</h4>
                    <p>{tips[currentTip].content}</p>
                </div>
            </div>
            <div className={styles.controls}>
                <button 
                    onClick={prevTip}
                    aria-label="Previous tip"
                    className={styles.controlButton}
                >
                    <FaChevronLeft />
                </button>
                <div className={styles.dots}>
                    {tips.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentTip ? styles.activeDot : ''}`}
                            onClick={() => {
                                setCurrentTip(index);
                                setIsAutoPlaying(false);
                            }}
                            aria-label={`Go to tip ${index + 1}`}
                        />
                    ))}
                </div>
                <button 
                    onClick={nextTip}
                    aria-label="Next tip"
                    className={styles.controlButton}
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default SecurityTipsCarousel;