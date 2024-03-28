"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { useState, useEffect } from 'react'; 

export default function App() {
    return (
        <div className="navbar  w-full">
            <div className="flex-1">
                <a className="text-2xl">Foto Genius</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                {/* <li>
                    <details>
                    <summary>
                        Use Cases
                    </summary>
                    <ul className="p-2 rounded-t-none">
                        <li><a href="/">Link 1</a></li>
                        <li><a href="/">Link 2</a></li>
                    </ul>
                    </details>
                </li> */}
                <li><a href="/">Contct Us</a></li>
                <li><a href="/">Privacy Policy</a></li>
                </ul>
            </div>
        </div>
    );
  }
