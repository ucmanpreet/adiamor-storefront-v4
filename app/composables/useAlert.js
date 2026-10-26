import Swal from 'sweetalert2';
export function createSwalAlert(message, type, isFixed = false) {
            if(type == 'error') {
                isFixed = true;
            }
            const timer = 3000;
            const iconMap = {
                success: `<svg class="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>`,
                error: `<svg class="w-6 h-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" fill="none" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6m0-6l-6 6" />
                        </svg>`,
                warning: `<svg class="w-6 h-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2.25m0 3h.008v.008H12V14.25zm0 6.75a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                        </svg>`,
                info: `<svg class="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2.25m0 3h.008v.008H12V14.25zm0 6.75a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                        </svg>`,
                question: `<svg class="w-6 h-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a3.375 3.375 0 1 1 6.75 0c0 1.657-1.395 2.507-2.25 3.375-.855.867-.75 2.25-.75 2.25m0 3h.008v.008H12V18.375z" />
                        </svg>`,
                close: 	`<svg class="w-6 h-6 text-gray-600" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.38487 7.49963L11.0724 4.81838C11.1901 4.70069 11.2562 4.54107 11.2562 4.37463C11.2562 4.20819 11.1901 4.04857 11.0724 3.93088C10.9547 3.81319 10.7951 3.74707 10.6286 3.74707C10.4622 3.74707 10.3026 3.81319 10.1849 3.93088L7.50362 6.61838L4.82237 3.93088C4.70468 3.81319 4.54506 3.74707 4.37862 3.74707C4.21219 3.74707 4.05256 3.81319 3.93487 3.93088C3.81718 4.04857 3.75107 4.20819 3.75107 4.37463C3.75107 4.54107 3.81718 4.70069 3.93487 4.81838L6.62237 7.49963L3.93487 10.1809C3.87629 10.239 3.8298 10.3081 3.79807 10.3843C3.76634 10.4604 3.75 10.5421 3.75 10.6246C3.75 10.7071 3.76634 10.7888 3.79807 10.865C3.8298 10.9411 3.87629 11.0103 3.93487 11.0684C3.99298 11.127 4.0621 11.1735 4.13826 11.2052C4.21443 11.2369 4.29612 11.2533 4.37862 11.2533C4.46113 11.2533 4.54282 11.2369 4.61898 11.2052C4.69515 11.1735 4.76427 11.127 4.82237 11.0684L7.50362 8.38088L10.1849 11.0684C10.243 11.127 10.3121 11.1735 10.3883 11.2052C10.4644 11.2369 10.5461 11.2533 10.6286 11.2533C10.7111 11.2533 10.7928 11.2369 10.869 11.2052C10.9451 11.1735 11.0143 11.127 11.0724 11.0684C11.131 11.0103 11.1775 10.9411 11.2092 10.865C11.2409 10.7888 11.2572 10.7071 11.2572 10.6246C11.2572 10.5421 11.2409 10.4604 11.2092 10.3843C11.1775 10.3081 11.131 10.239 11.0724 10.1809L8.38487 7.49963Z" fill="currentColor"/>
                        </svg>`
            };
            const colorClassMap = {
                success: 'text-green-800 border-green-300 bg-green-50',
                error: 'text-red-800 border-red-300 bg-red-50',
                warning: 'text-yellow-800 border-yellow-300 bg-yellow-50',
                info: 'text-blue-800 border-blue-300 bg-blue-50',
                question: 'text-purple-800 border-purple-300 bg-purple-50'
            };
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: isFixed ? undefined : timer,
            })
            Toast.fire({
                title: null,
                html: `
                    <div class="border-l-4 ${colorClassMap[type] || colorClassMap.success} p-4 relative">
                        ${ isFixed ? `<button id="toast-close-btn" class="absolute top-1 right-1 text-gray-600 hover:text-gray-600 transition-colors">
                        ${iconMap['close'] || ''}
                        </button>` : '' }
                        <div class="flex items-center">
                            <div class="shrink-0">
                                ${iconMap[type] || ''}
                            </div>
                            <div class="ml-3">
                            <p class="text-sm text-current">
                                ${message}
                            </p>
                            </div>
                        </div>
                    </div>`,
                didOpen: (toast) => {
                    const closeBtn = toast?.querySelector('button#toast-close-btn');
                    if (closeBtn) {
                    closeBtn.addEventListener('click', () => {
                        Swal.close();
                    });
                    }
                }
            });
}

export const useAlert = () => ({ createSwalAlert })
