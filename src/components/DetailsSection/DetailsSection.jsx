import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { saveUserProfile } from '../../firebase';


const ProfileForm = () => {
  const navigate = useNavigate();
  const { user, profile: ctxProfile, profileLoading, refreshProfile } = useAuth();
  const [level, setLevel] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [targetWeight, setTargetWeight] = useState('');
  const [targetUnit, setTargetUnit] = useState('kg');
  const [goal, setGoal] = useState('');
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(true);
  const [isNewProfile, setIsNewProfile] = useState(true);
  const [touched, setTouched] = useState({
    fullName: false,
    age: false,
    gender: false,
    height: false,
    weight: false,
    targetWeight: false,
    goal: false,
    workoutsPerWeek: false,
    level: false,
  });
  const [submittedAttempted, setSubmittedAttempted] = useState(false);

 
  const applyProfile = (data = {}) => {
    setFullName(data.fullName || '');
    setAge(data.age != null ? String(data.age) : '');
    setGender(data.gender || '');
    setLevel(data.level || '');
    setGoal(data.goal || '');
    setWorkoutsPerWeek(data.workoutsPerWeek != null ? String(data.workoutsPerWeek) : '');
    setHeightUnit(data.heightUnit || 'cm');
    setWeightUnit(data.weightUnit || 'kg');
    setTargetUnit(data.targetUnit || 'kg');
    setHeight(data.height != null ? String(data.height) : '');
    setWeight(data.weight != null ? String(data.weight) : '');
    setTargetWeight(data.targetWeight != null ? String(data.targetWeight) : '');
  };

  
  const round = (n, d = 2) => {
    if (n === null || n === undefined || isNaN(n)) return '';
    return Number(parseFloat(n).toFixed(d));
  };
  const cmToFt = (cm) => cm / 30.48;
  const ftToCm = (ft) => ft * 30.48;
  const kgToLbs = (kg) => kg * 2.20462;
  const lbsToKg = (lbs) => lbs / 2.20462;

  const handleHeightUnitChange = (newUnit) => {
    if (height) {
      const value = parseFloat(height);
      if (!isNaN(value)) {
        const converted = newUnit === 'ft' ? cmToFt(value) : ftToCm(value);
        setHeight(String(round(converted)));
      }
    }
    setHeightUnit(newUnit);
  };

  const handleWeightUnitChange = (newUnit) => {
    if (weight) {
      const value = parseFloat(weight);
      if (!isNaN(value)) {
        const converted = newUnit === 'lbs' ? kgToLbs(value) : lbsToKg(value);
        setWeight(String(round(converted)));
      }
    }
    setWeightUnit(newUnit);
  };

  const handleTargetUnitChange = (newUnit) => {
    if (targetWeight) {
      const value = parseFloat(targetWeight);
      if (!isNaN(value)) {
        const converted = newUnit === 'lbs' ? kgToLbs(value) : lbsToKg(value);
        setTargetWeight(String(round(converted)));
      }
    }
    setTargetUnit(newUnit);
  };

  useEffect(() => {
    if (!user) { setFormLoading(false); return; }

    const cacheKey = `profileDraft:${user.uid}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const cachedData = JSON.parse(cached);
        if (cachedData) {
          applyProfile(cachedData);
          }
      } catch {}
    }

     if (!profileLoading) {
      if (ctxProfile) {
        applyProfile(ctxProfile);
        setIsNewProfile(false);
      } else {
        setIsNewProfile(true);
      }
      setFormLoading(false);
    }
  }, [user, ctxProfile, profileLoading]);

   const errors = {
    fullName: (!fullName || fullName.trim().length < 2) ? 'Please enter your full name.' : '',
    age: (!age || isNaN(Number(age)) || Number(age) < 10 || Number(age) > 120) ? 'Enter a valid age (10-120).' : '',
    gender: (!gender) ? 'Please select your gender.' : '',
    height: (!height || isNaN(Number(height)) || Number(height) <= 0 || ((heightUnit === 'cm' && Number(height) > 300) || (heightUnit === 'ft' && Number(height) > 9))) ? `Enter a valid height in ${heightUnit}.` : '',
    weight: (!weight || isNaN(Number(weight)) || Number(weight) <= 0) ? `Enter a valid weight in ${weightUnit}.` : '',
    targetWeight: (targetWeight && (isNaN(Number(targetWeight)) || Number(targetWeight) <= 0)) ? `Enter a valid target weight in ${targetUnit}.` : '',
    goal: (!goal) ? 'Please select your primary goal.' : '',
    workoutsPerWeek: (!workoutsPerWeek || isNaN(Number(workoutsPerWeek)) || Number(workoutsPerWeek) < 1 || Number(workoutsPerWeek) > 6) ? 'Choose days between 1 and 6.' : '',
    level: (!level) ? 'Please choose your fitness level.' : '',
  };
  const showError = (field) => (touched[field] || submittedAttempted) && errors[field];
  return (
    <div className="profile-page">
      <h1 className="profile-title">
        Complete Your <span>Profile</span>
      </h1>
      <p className="profile-subtitle">
        Help us personalize your fitness journey with your details
      </p>

      {/* name , age , gender */}
      <section className="profile-card">
        <div className="card-header">
          <h2>Personal Information</h2>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" value={fullName} onChange={e => setFullName(e.target.value)} onBlur={() => setTouched(t => ({...t, fullName: true}))} aria-invalid={!!showError('fullName')} aria-describedby="err-fullName" />
            {showError('fullName') && <div id="err-fullName" className="form-error" role="alert">{errors.fullName}</div>}
          </div>
          <div className="form-group">
            <label>Age</label>
            <input type="number" placeholder="Enter your age" value={age} onChange={e => setAge(e.target.value)} onBlur={() => setTouched(t => ({...t, age: true}))} aria-invalid={!!showError('age')} aria-describedby="err-age" />
            {showError('age') && <div id="err-age" className="form-error" role="alert">{errors.age}</div>}
          </div>
        </div>

        <div className="form-group gender-group">
          <label>Gender</label>
          <div className="radio-group">
            <label><input type="radio" name="gender" checked={gender==='Male'} onChange={() => setGender('Male')} onBlur={() => setTouched(t => ({...t, gender: true}))} /> Male</label>
            <label><input type="radio" name="gender" checked={gender==='Female'} onChange={() => setGender('Female')} onBlur={() => setTouched(t => ({...t, gender: true}))} /> Female</label>
            <label><input type="radio" name="gender" checked={gender==='Other'} onChange={() => setGender('Other')} onBlur={() => setTouched(t => ({...t, gender: true}))} /> Other</label>
          </div>
          {showError('gender') && <div className="form-error" role="alert">{errors.gender}</div>}
        </div>
      </section>

      {/* height, weight, target weight */}
      <section className="profile-card">
        <div className="card-header">
          
          <h2>Body Metrics</h2>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Height</label>
            <div className="input-with-unit">
              <input type="number" placeholder="170" value={height} onChange={e => setHeight(e.target.value)} onBlur={() => setTouched(t => ({...t, height: true}))} aria-invalid={!!showError('height')} aria-describedby="err-height" />
              <select value={heightUnit} onChange={e => handleHeightUnitChange(e.target.value)}>
                <option value="cm">cm</option>
                <option value="ft">ft</option>
              </select>
              {showError('height') && <div id="err-height" className="form-error" role="alert">{errors.height}</div>}
            </div>
          </div>
          <div className="form-group">
            <label>Current Weight</label>
            <div className="input-with-unit">
              <input type="number" placeholder="70" value={weight} onChange={e => setWeight(e.target.value)} onBlur={() => setTouched(t => ({...t, weight: true}))} aria-invalid={!!showError('weight')} aria-describedby="err-weight" />
              <select value={weightUnit} onChange={e => handleWeightUnitChange(e.target.value)}>
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
              {showError('weight') && <div id="err-weight" className="form-error" role="alert">{errors.weight}</div>}
            </div>
          </div>
        </div>

        <div className="form-group target-weight">
          <label>Target Weight</label>
          <div className="input-with-unit">
      <input type="number" placeholder="65" value={targetWeight} onChange={e => setTargetWeight(e.target.value)} onBlur={() => setTouched(t => ({...t, targetWeight: true}))} aria-invalid={!!showError('targetWeight')} aria-describedby="err-target" />
      <select value={targetUnit} onChange={e => handleTargetUnitChange(e.target.value)}>
        <option value="kg">kg</option>
        <option value="lbs">lbs</option>
      </select>
      {showError('targetWeight') && <div id="err-target" className="form-error" role="alert">{errors.targetWeight}</div>}
          </div>
        </div>
      </section>

      {/* Fitness Level Section */}
      <section className="profile-card">
        <div className="card-header">
          
          <h2>Fitness Level</h2>
        </div>

        <div className="training-level">
          <button
            type="button"
            className={"level-btn" + (level === 'beginner' ? ' active' : '')}
            aria-pressed={level === 'beginner'}
            onClick={() => setLevel('beginner')}
          >
            Beginner<br/><br/><span>New to fitness</span>
          </button>

          <button
            type="button"
            className={"level-btn" + (level === 'intermediate' ? ' active' : '')}
            aria-pressed={level === 'intermediate'}
            onClick={() => setLevel('intermediate')}
          >
            Intermediate<br/><br/><span>Regular workouts</span>
          </button>

          <button
            type="button"
            className={"level-btn" + (level === 'advanced' ? ' active' : '')}
            aria-pressed={level === 'advanced'}
            onClick={() => setLevel('advanced')}
          >
            Advanced<br/><br/><span>Experienced</span>
          </button>

        </div>

        <div className="form-group">
          <label>Primary Goal</label>
          <select value={goal} onChange={e => setGoal(e.target.value)} onBlur={() => setTouched(t => ({...t, goal: true}))} aria-invalid={!!showError('goal')} aria-describedby="err-goal">
            <option value="">Select your primary fitness goal</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Fitness Maintenance">Fitness Maintenance</option>
          </select>
          {showError('goal') && <div id="err-goal" className="form-error" role="alert">{errors.goal}</div>}
        </div>
        <br/>

        <div className="form-group">
          <label>Workouts per week</label>
          <select value={workoutsPerWeek} onChange={e => setWorkoutsPerWeek(e.target.value)} onBlur={() => setTouched(t => ({...t, workoutsPerWeek: true}))} aria-invalid={!!showError('workoutsPerWeek')} aria-describedby="err-days">
            <option value="">How many days can you commit</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          {showError('workoutsPerWeek') && <div id="err-days" className="form-error" role="alert">{errors.workoutsPerWeek}</div>}
  </div>
  {showError('level') && <div className="form-error" role="alert">{errors.level}</div>}
      </section>

      <div className="profile-actions">
        
        {error && <div className="form-error" role="alert">{error}</div>}
        {success && <div className="form-success" role="status">Profile saved!</div>}
        {formLoading && (
          <div className="spinner" role="status" aria-live="polite">Loading profile...</div>
        )}
        <button
          type="button"
          className="btn-primary"
          disabled={saving}
          onClick={async () => {
            setError('');
            setSuccess(false);
            setSubmittedAttempted(true);
            if (!user) {
              setError('You must be signed in to save your profile.');
              return;
            }
            const hasErrors = Object.values(errors).some(Boolean);
            if (hasErrors) { setError('Please fix the errors above before continuing.'); return; }
            setSaving(true);
            const payload = {
              fullName,
              age: Number(age),
              gender,
              height: height ? Number(height) : null,
              heightUnit,
              weight: weight ? Number(weight) : null,
              weightUnit,
              targetWeight: targetWeight ? Number(targetWeight) : null,
              targetUnit,
              level,
              goal,
              workoutsPerWeek: workoutsPerWeek ? Number(workoutsPerWeek) : null,
            };

            console.time('saveUserProfile');
            if (isNewProfile) {
              try {
                await saveUserProfile(user.uid, payload);
                console.timeEnd('saveUserProfile');
                setSuccess(true);
                try { localStorage.setItem(`profileDraft:${user.uid}`, JSON.stringify(payload)); } catch {}
                try { await refreshProfile(); } catch {}
                navigate('/dashboard');
              } catch (e) {
                console.timeEnd('saveUserProfile');
                console.error('Profile save failed', e);
                setError(e.message || 'Failed to save profile');
              } finally {
                setSaving(false);
              }
            } else {
              navigate('/dashboard');
              saveUserProfile(user.uid, payload)
                .then(() => {
                  console.timeEnd('saveUserProfile');
                  setSuccess(true);
                  try { localStorage.setItem(`profileDraft:${user.uid}`, JSON.stringify(payload)); } catch {}
                  refreshProfile();
                })
                .catch((e) => {
                  console.timeEnd('saveUserProfile');
                  console.error('Background profile save failed', e);
                  localStorage.setItem('profileSaveFailed', '1');
                })
                .finally(() => setSaving(false));
            }
          }}
        >
          {saving ? 'Saving...' : 'Complete Profile'}
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
