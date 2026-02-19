import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  // Using the test UUID we put in Supabase earlier
  const userId = '550e8400-e29b-41d4-a716-446655440000'; 
  
  // REPLACE with your Render URL after Step 2
  const BACKEND_URL = 'https://dashboard.render.com/web/srv-d6bbdi8boq4c73fhm5ug'; 

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    })
    .then(res => res.json())
    .then(json => setData(json))
    .catch(err => console.error("Sync Error:", err));
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', fontFamily: 'Arial', border: '1px solid #eee', borderRadius: '12px', textAlign: 'center' }}>
      <h1>Learning Progress</h1>
      {data ? (
        <div>
          <div style={{ background: '#f0f7ff', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3 style={{ margin: 0 }}>Level: {data.current_level}</h3>
          </div>
          <p>AI Recommendation:</p>
          <h2 style={{ color: '#0070f3' }}>{data.recommended_topic}</h2>
          <p style={{ color: '#666' }}>Logic: {data.difficulty_adjustment} Difficulty</p>
        </div>
      ) : <p>Analyzing performance...</p>}
    </div>
  );
}
export default App;