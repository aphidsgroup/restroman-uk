import React from 'react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      background: '#f5f5f5',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#333' }}>
        Restroman UK
      </h1>
      
      <p style={{ fontSize: '1.2rem', marginBottom: '30px', textAlign: 'center', maxWidth: '600px', color: '#666' }}>
        Restaurant Management Dashboard - A comprehensive solution for restaurant owners and managers
      </p>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link href="/dashboard" passHref>
          <button style={{ 
            padding: '10px 20px', 
            background: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            Dashboard
          </button>
        </Link>
        
        <Link href="/pos" passHref>
          <button style={{ 
            padding: '10px 20px', 
            background: '#2196F3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            POS System
          </button>
        </Link>
      </div>
    </div>
  )
} 