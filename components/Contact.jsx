"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { useState, useEffect } from 'react'; 

export default function Contact() {
    return (
        <div class="hero mt-5">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">Contact Us!</h1>
                <p class="py-6">Experience the ease of removing backgrounds from your high-resolution photos within seconds, completely free of charge! Take a leap and give it a go now!</p>
                </div>
                <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form class="card-body">
                    <div class="form-control">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" class="input input-bordered" required />
                    </div>
                    <div class="form-control">
                    <label class="label">
                        <span class="label-text">Message</span>
                    </label>
                    <textarea className="textarea textarea-bordered" placeholder="Message"></textarea>
                    </div>
                    <div class="form-control mt-6">
                    <button class="black_btn">Send</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
    );
  }
