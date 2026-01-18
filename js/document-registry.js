/**
 * Document Registry - Single source of truth for all publication versions
 * 
 * Usage:
 *   1. Include this script in your HTML: <script src="/js/document-registry.js"></script>
 *   2. Add data-doc attributes to elements:
 *      - <a data-doc="synthesis" data-doc-link>Download</a>  → sets href to PDF
 *      - <span data-doc="synthesis" data-doc-version></span> → displays "v1.3.1"
 *      - <span data-doc="synthesis" data-doc-title></span>   → displays title
 *      - <span data-doc="synthesis" data-doc-filename></span> → displays filename
 *   3. Or access programmatically: DocRegistry.get('synthesis').version
 */

const DocRegistry = {
    _data: null,
    _loaded: false,
    _callbacks: [],

    async init() {
        if (this._loaded) return this._data;
        
        try {
            const response = await fetch('/data/document-registry.json');
            this._data = await response.json();
            this._loaded = true;
            this._applyToDOM();
            this._callbacks.forEach(cb => cb(this._data));
            return this._data;
        } catch (error) {
            console.error('Failed to load document registry:', error);
            return null;
        }
    },

    get(docId) {
        if (!this._loaded || !this._data) {
            console.warn('Document registry not yet loaded. Call DocRegistry.init() first.');
            return null;
        }
        return this._data.documents[docId] || null;
    },

    getPath(docId) {
        const doc = this.get(docId);
        return doc ? `/documents/${doc.filename}` : null;
    },

    getVersion(docId) {
        const doc = this.get(docId);
        return doc ? `v${doc.version}` : null;
    },

    getAllByCategory(category) {
        if (!this._loaded || !this._data) return [];
        return Object.values(this._data.documents).filter(d => d.category === category);
    },

    onLoad(callback) {
        if (this._loaded) {
            callback(this._data);
        } else {
            this._callbacks.push(callback);
        }
    },

    _applyToDOM() {
        // Update all elements with data-doc attributes
        document.querySelectorAll('[data-doc]').forEach(el => {
            const docId = el.dataset.doc;
            const doc = this.get(docId);
            if (!doc) {
                console.warn(`Document not found in registry: ${docId}`);
                return;
            }

            // Set href for links
            if (el.hasAttribute('data-doc-link')) {
                el.href = `/documents/${doc.filename}`;
            }

            // Set version text
            if (el.hasAttribute('data-doc-version')) {
                el.textContent = `v${doc.version}`;
            }

            // Set title text
            if (el.hasAttribute('data-doc-title')) {
                el.textContent = doc.title;
            }

            // Set filename text
            if (el.hasAttribute('data-doc-filename')) {
                el.textContent = doc.filename;
            }
        });
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => DocRegistry.init());
} else {
    DocRegistry.init();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DocRegistry;
}
