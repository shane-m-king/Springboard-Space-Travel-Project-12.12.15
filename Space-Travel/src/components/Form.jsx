import styles from './Form.module.css';
import SpaceTravelApi from '../services/SpaceTravelApi';
import BackButton from './BackButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CraftButton from './CraftButton';

const Form = () => {
  const navigate = useNavigate();
  const INITIAL_DATA = {
    name: '',
    capacity: '',
    description: '',
    picture: ''
  };
  const [invalidFields, setInvalidFields] = useState({
    name: false,
    capacity: false,
    description: false,
  });
  const [formData, setFormData] = useState(INITIAL_DATA);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(data => ({...data, [name]: value})
  )}

  const handleSubmit = async(e) => {
    e.preventDefault();

    const newInvalids = {
      name: !formData.name,
      capacity: !formData.capacity,
      description: !formData.description
    }

    // Ensures capacity is a number
    const capacityNum = Number(formData.capacity);
    if (Number.isNaN(capacityNum) || capacityNum < 1 || capacityNum > 9999999999) {
      newInvalids.capacity = true;
    }

    // Sets max length for spacecraft name
    if (formData.name.length > 40) {
      newInvalids.name =true;
      alert('Spacecraft name must be 40 characters or less.');
    }

    setInvalidFields(newInvalids);

    if (Object.values(newInvalids).some(Boolean)) return;

    // Adds generic picture if one is not entered
    let picture = formData.picture;
    if (!picture) picture = 'https://media.istockphoto.com/id/1452870348/vector/rocket-ship-icon-in-flat-style-spacecraft-takeoff-on-space-background-start-up-illustration.jpg?s=612x612&w=0&k=20&c=Ik4wg3D1NmtuebK88Bgb3CKwY7xx5SQ4RcZWKl38ydw=';

    const { isError } = await SpaceTravelApi.buildSpacecraft({
      name: formData.name,
      capacity: capacityNum,
      description: formData.description,
      pictureUrl: picture
    });

    if (!isError) {
      navigate('/spacecrafts');
      setFormData(INITIAL_DATA);
      setInvalidFields({name: false, capacity: false, description: false});
    }

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div id={styles['form-container']}>
          <label>Name:</label>
          <div>
            <input 
              id={styles['form-container__name']}
              className={invalidFields.name ? styles['form-container__input-error'] : ''}
              type='text'
              name='name'
              placeholder='Name'
              value={formData.name}
              autoComplete='off'
              onChange={handleChange}
            />
            {invalidFields.name && (
              <p className={styles['form-container__error']}>
                Name is required (max 40 characters).
              </p>
            )}
          </div>
          <label>Capacity:</label>
          <div>
            <input
              id={styles['form-container__capacity']}
              className={invalidFields.capacity ? styles['form-container__input-error'] : ''}
              type='number'
              min='1'
              name='capacity'
              placeholder='Capacity'
              value={formData.capacity}
              autoComplete='off'
              onChange={handleChange}
            />
            {invalidFields.capacity && (
              <p className={styles['form-container__error']}>
                Capacity must be a number greater than 0 and less than 10,000,000,000.
              </p>
            )}
          </div>
          <label>Description:</label>
          <div>  
            <textarea
              id={styles['form-container__description']}
              className={invalidFields.description ? styles['form-container__input-error'] : ''}
              name='description'
              placeholder='Description'
              value={formData.description}
              autoComplete='off'
              onChange={handleChange}
            />
            {invalidFields.description && (
              <p className={styles['form-container__error']}>
                Description is required.
              </p>
            )}
          </div>
          <label>Picture URL:</label>
          <div>
            <input 
              id={styles['form-container__picture']}
              type='text'
              name='picture'
              placeholder='Picture URL (optional)'
              value={formData.picture}
              autoComplete='off'
              onChange={handleChange}/>
          </div>
          <BackButton/>
          <CraftButton/>
        </div>  
      </form>
    </>
  )
}

export default Form