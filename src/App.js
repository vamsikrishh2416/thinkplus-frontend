import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  
  // 1. Ensure this userId exists in your Supabase 'users' table!
  const userId = '550e8400-e29b-41d4-a716-446655440000'; 
  
  // 2. BUG FIX: Use the Service URL, not the Dashboard URL
  const BACKEND_URL = 'https://thinkplus-backend-1.onrender.com'; 

  useEffect(() => {
    // 3. BUG FIX: Changed to GET to match the 'app.get' logic in your backend
    fetch(`${BACKEND_URL}/api/recommendations/${userId}`)
    .then(res => {
        if (!res.ok) throw new Error('Backend not responding');
        return res.json();
    })
    .then(json => {
        // 4. BUG FIX: Mapping your backend response keys to the UI
        setData({
            current_level: json.recommendedPath, // From your avgScore logic
            recommended_topic: `Next Path: ${json.recommendedPath}`,
            difficulty_adjustment: json.averageScore.toFixed(1)
        });
    })
    .catch(err => console.error("Sync Error:", err));
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', fontFamily: 'Arial', border: '1px solid #eee', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h1>Learning Progress</h1>
      {data ? (
        <div>
          <div style={{ background: '#f0f7ff', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3 style={{ margin: 0 }}>Level: {data.current_level}</h3>
          </div>
          <p>AI Recommendation:</p>
          <h2 style={{ color: '#0070f3' }}>{data.recommended_topic}</h2>
          <p style={{ color: '#666' }}>Average Score: {data.difficulty_adjustment}%</p>
        </div>
      ) : (
        <div>
            <p>Analyzing performance...</p>
            <small style={{color: '#ccc'}}>Checking: {BACKEND_URL}</small>
        </div>
      )}
    </div>
  );
}

export default App;
