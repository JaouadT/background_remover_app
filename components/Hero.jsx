"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { useState, useEffect } from 'react'; 

export default function App() {
    return (
        <div className="hero pb-2 mb-12">
            <div className="hero-content flex-col lg:flex-row-reverse">
                {/* <img src="public/assets/images/hero_img.jpg" className="max-w-sm rounded-lg shadow-2xl" /> */}
                <Image
                    src="/assets/images/hero_img.png"
                    width={300}
                    height={300}
                    alt="Picture of the author"
                />
                <div>
                <h1 className="head_text">
                    AI Powered, FREE
                    <br  />
                    <span className="orange_gradient" >Image Background Remover</span>
                </h1>
                <p className="py-6">Experience the ease of removing backgrounds from your high-resolution photos within seconds, completely free of charge! Take a leap and give it a go now!</p>
                {/* <button className="black_btn">Get Started</button> */}
                </div>
            </div>
        </div>
    );
  }


