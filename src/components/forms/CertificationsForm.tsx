import React from 'react';
import { Certification } from '../../types/userData';
import { Plus, X } from 'lucide-react';

interface CertificationsFormProps {
  certifications: Certification[];
  updateUserData: (data: Certification[]) => void;
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({ certifications, updateUserData }) => {
  const handleAddCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      url: '',
      expiry: ''
    };
    
    updateUserData([...certifications, newCertification]);
  };

  const handleRemoveCertification = (id: string) => {
    const updatedCertifications = certifications.filter(certification => certification.id !== id);
    updateUserData(updatedCertifications);
  };

  const handleChange = (id: string, field: keyof Certification, value: any) => {
    const updatedCertifications = certifications.map(certification => 
      certification.id === id ? { ...certification, [field]: value } : certification
    );
    updateUserData(updatedCertifications);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {certifications.length === 0 && (
          <p className="text-sm text-gray-500 italic">No certifications added yet.</p>
        )}
        
        {certifications.map(certification => (
          <div key={certification.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-gray-900 mb-3">
                {certification.name || 'New Certification'}
              </h4>
              <button
                type="button"
                onClick={() => handleRemoveCertification(certification.id)}
                className="p-1 text-gray-500 hover:text-red-500"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certification Name
                  </label>
                  <input
                    type="text"
                    value={certification.name}
                    onChange={(e) => handleChange(certification.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. AWS Certified Solutions Architect"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    value={certification.issuer}
                    onChange={(e) => handleChange(certification.id, 'issuer', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Amazon Web Services"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Date
                  </label>
                  <input
                    type="month"
                    value={certification.date}
                    onChange={(e) => handleChange(certification.id, 'date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date (optional)
                  </label>
                  <input
                    type="month"
                    value={certification.expiry}
                    onChange={(e) => handleChange(certification.id, 'expiry', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credential URL (optional)
                </label>
                <input
                  type="url"
                  value={certification.url}
                  onChange={(e) => handleChange(certification.id, 'url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. https://www.credential.net/..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        type="button"
        onClick={handleAddCertification}
        className="mt-4 flex items-center justify-center w-full py-2 px-4 border border-dashed border-gray-300 rounded-md text-sm font-medium text-blue-600 hover:text-blue-800 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
      >
        <Plus size={16} className="mr-1.5" />
        Add Certification
      </button>
    </div>
  );
};

export default CertificationsForm;