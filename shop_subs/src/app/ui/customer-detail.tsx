import { Customer, Phone, Email, Address } from "@/types";


export default function CustomerDetail(params: {customer:Customer, phones:Phone[], emails:Email[], addresses: Address[]}) {
    const customer = params.customer
    const emails = params.emails
    const phones = params.phones
    const addresses = params.addresses

    return (
        <div className='grid grid-cols-4 gap-4 align-center text-center p-4 rounded-lg shadow-md mt-4'>
        <div className='border border-gray-300 rounded p-4 mt-4'>
          <p>
            <strong>Name:</strong> {customer?.first_name} {customer?.last_name}
          </p>
          <p>
            <strong>Notes:</strong> {customer?.notes}
          </p>
        </div>
        <div className='border border-gray-300 rounded p-4 mt-4'>
          <h3 className='text-lg font-bold'>Phone Numbers</h3>
          <ul>
            {phones.map((phone) => (
              <li key={phone.id}>
                <strong>{phone.type}:</strong> {phone.number}
              </li>
            ))}
          </ul>
        </div>
        <div className='border border-gray-300 rounded p-4 mt-4'>
          <h3 className='text-lg font-bold'>Email Addresses</h3>
          <ul>
            {emails.map((email) => (
              <li key={email.id}>
                <strong>{email.type}:</strong> {email.address}
              </li>
            ))}
          </ul>
        </div>
        <div className='border border-gray-300 rounded p-4 mt-4'>
          <h3 className='text-lg font-bold'>Addresses</h3>
          <ul>
            {addresses.map((address) => (
              <li key={address.id}>
                {address.street}, {address.city}, {address.state}{" "}
                {address.zip_code}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
}