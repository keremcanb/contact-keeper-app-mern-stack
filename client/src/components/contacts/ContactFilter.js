import { useRef, useEffect } from 'react';
import { useContactContext } from '../../context/providers/contact';

const ContactFilter = () => {
  const text = useRef('');
  const { filterContacts, clearFilter, filtered } = useContactContext();

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange} />
    </form>
  );
};

export default ContactFilter;
