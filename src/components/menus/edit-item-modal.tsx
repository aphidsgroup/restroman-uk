'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { useDropzone } from 'react-dropzone'
import { Image as LucideImage, X, Plus, Minus, Percent, PoundSterling, Edit, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { MenuItem, DayAvailability, TimeSlot, Allergen, PriceChange } from '@/types/menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

interface EditItemModalProps {
  item: MenuItem | null
  open: boolean
  onClose: () => void
  onSave: (item: MenuItem) => void
}

const DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const

const DEFAULT_AVAILABILITY: DayAvailability = {
  isAvailable: true,
  type: 'All Day',
  times: []
}

const COMMON_ALLERGENS: Allergen[] = [
  { id: 'celery', name: 'Celery' },
  { id: 'crustaceans', name: 'Crustaceans' },
  { id: 'eggs', name: 'Eggs' },
  { id: 'fish', name: 'Fish' },
  { id: 'gluten', name: 'Gluten' },
  { id: 'lupin', name: 'Lupin' },
  { id: 'milk', name: 'Milk' },
  { id: 'molluscs', name: 'Molluscs' },
  { id: 'mustard', name: 'Mustard' },
  { id: 'nuts', name: 'Nuts' },
  { id: 'peanuts', name: 'Peanuts' },
  { id: 'sesame', name: 'Sesame' },
  { id: 'soya', name: 'Soya' },
  { id: 'sulphites', name: 'Sulphites' }
]

const DEFAULT_PRICE_CHANGE: PriceChange = {
  id: '',
  name: '',
  type: 'increase',
  value: 0,
  startDate: format(new Date(), 'yyyy-MM-dd'),
  endDate: format(new Date(), 'yyyy-MM-dd'),
  daysOfWeek: [],
  active: true
}

export function EditItemModal({ item, open, onClose, onSave }: EditItemModalProps) {
  const [currentItem, setCurrentItem] = useState<MenuItem>(
    item || {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      price: 0,
      hideItem: false,
      delivery: true,
      collection: true,
      dineIn: true,
      availability: DAYS_OF_WEEK.reduce((acc, day) => ({
        ...acc,
        [day]: { ...DEFAULT_AVAILABILITY }
      }), {}),
      allergens: {
        contains: [],
        mayContain: []
      },
      priceChanges: [],
      // Default values for Items tab
      showOnlyCategoriesWithSelectedItems: false,
      showOnlySelectedItems: false,
      limitToSingleChoice: false,
      addAttributeCharges: true, // Default to true based on screenshot
      useProductPrices: false,
      showChoiceAsDropdown: true, // Default to true based on screenshot
      selectedItems: [],
      // Default values for Settings tab
      tillProviderId: '',
      cssClass: '',
      freeDelivery: false,
      collectionOnly: false,
      deleted: false,
      hidePrice: false
    }
  )

  const [editingPriceChange, setEditingPriceChange] = useState<PriceChange | null>(null)

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    onDrop: (acceptedFiles) => {
      // In a real app, you would upload these files to your storage
      const imageUrls = acceptedFiles.map(file => URL.createObjectURL(file))
      setCurrentItem(prev => ({
        ...prev,
        images: [...(prev.images || []), ...imageUrls]
      }))
    }
  })

  const handleSave = () => {
    onSave(currentItem)
    onClose()
  }

  const removeImage = (index: number) => {
    setCurrentItem(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index)
    }))
  }

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof MenuItem
  ) => {
    setCurrentItem(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof MenuItem
  ) => {
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value)
    setCurrentItem(prev => ({ ...prev, [field]: value }))
  }

  const handleAvailabilityTypeChange = (day: typeof DAYS_OF_WEEK[number], type: DayAvailability['type']) => {
    setCurrentItem(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability?.[day],
          type,
          times: type === 'Specific Times' ? [{ start: '09:00', end: '17:00' }] : []
        }
      }
    }))
  }

  const handleAvailabilityToggle = (day: typeof DAYS_OF_WEEK[number]) => {
    setCurrentItem(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability?.[day],
          isAvailable: !prev.availability?.[day]?.isAvailable
        }
      }
    }))
  }

  const addTimeSlot = (day: typeof DAYS_OF_WEEK[number]) => {
    setCurrentItem(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability?.[day],
          times: [...(prev.availability?.[day]?.times || []), { start: '09:00', end: '17:00' }]
        }
      }
    }))
  }

  const removeTimeSlot = (day: typeof DAYS_OF_WEEK[number], index: number) => {
    setCurrentItem(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability?.[day],
          times: prev.availability?.[day]?.times?.filter((_, i) => i !== index)
        }
      }
    }))
  }

  const updateTimeSlot = (
    day: typeof DAYS_OF_WEEK[number],
    index: number,
    field: keyof TimeSlot,
    value: string
  ) => {
    setCurrentItem(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability?.[day],
          times: prev.availability?.[day]?.times?.map((slot, i) =>
            i === index ? { ...slot, [field]: value } : slot
          )
        }
      }
    }))
  }

  const toggleAllergen = (allergenId: string, type: 'contains' | 'mayContain') => {
    setCurrentItem(prev => {
      const allergens = prev.allergens || { contains: [], mayContain: [] }
      const currentList = allergens[type]
      const updatedList = currentList.includes(allergenId)
        ? currentList.filter(id => id !== allergenId)
        : [...currentList, allergenId]

      // If an allergen is added to 'contains', remove it from 'mayContain' and vice versa
      const otherType = type === 'contains' ? 'mayContain' : 'contains'
      const otherList = allergens[otherType].filter(id => id !== allergenId)

      return {
        ...prev,
        allergens: {
          ...allergens,
          [type]: updatedList,
          [otherType]: otherList
        }
      }
    })
  }

  const addPriceChange = () => {
    const newPriceChange: PriceChange = {
      ...DEFAULT_PRICE_CHANGE,
      id: Math.random().toString(36).substr(2, 9)
    }
    setEditingPriceChange(newPriceChange)
  }

  const savePriceChange = (priceChange: PriceChange) => {
    setCurrentItem(prev => ({
      ...prev,
      priceChanges: [
        ...(prev.priceChanges || []).filter(pc => pc.id !== priceChange.id),
        priceChange
      ]
    }))
    setEditingPriceChange(null)
  }

  const deletePriceChange = (id: string) => {
    setCurrentItem(prev => ({
      ...prev,
      priceChanges: prev.priceChanges?.filter(pc => pc.id !== id) || []
    }))
  }

  const togglePriceChangeActive = (id: string) => {
    setCurrentItem(prev => ({
      ...prev,
      priceChanges: prev.priceChanges?.map(pc =>
        pc.id === id ? { ...pc, active: !pc.active } : pc
      ) || []
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{item ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid grid-cols-7 w-full">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="price-changes">Price Changes</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="allergens">Allergens</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={currentItem.name}
                  onChange={(e) => handleTextChange(e, 'name')}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={currentItem.description || ''}
                  onChange={(e) => handleTextChange(e, 'description')}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (£)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={currentItem.price}
                    onChange={(e) => handleNumberChange(e, 'price')}
                  />
                </div>

                <div>
                  <Label htmlFor="weight">Weight (g)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={currentItem.weight || ''}
                    onChange={(e) => handleNumberChange(e, 'weight')}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="calorificValue">Calorific Value</Label>
                <Input
                  id="calorificValue"
                  value={currentItem.calorificValue || ''}
                  onChange={(e) => handleTextChange(e, 'calorificValue')}
                />
              </div>

              <div>
                <Label htmlFor="calorieDetails">Calorie Details</Label>
                <Textarea
                  id="calorieDetails"
                  value={currentItem.calorieDetails || ''}
                  onChange={(e) => handleTextChange(e, 'calorieDetails')}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <div {...getRootProps()} className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-gray-400">
              <input {...getInputProps()} />
              <div className="flex flex-col items-center">
                <LucideImage className="h-12 w-12 text-gray-400" />
                <p className="mt-2">Drag & drop images here, or click to select files</p>
                <p className="text-sm text-gray-500">Supports: JPG, PNG, WebP</p>
              </div>
            </div>

            {currentItem.images && currentItem.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {currentItem.images.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={image}
                      alt={`Menu item image ${index + 1}`}
                      width={200}
                      height={150}
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="price-changes" className="space-y-6">
            <div className="space-y-4">
              {currentItem.priceChanges?.map(priceChange => (
                <div
                  key={priceChange.id}
                  className={`border rounded-lg p-4 ${
                    priceChange.active ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={priceChange.active}
                        onCheckedChange={() => togglePriceChangeActive(priceChange.id)}
                      />
                      <div>
                        <h4 className="font-medium">{priceChange.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          {priceChange.type === 'increase' && (
                            <>
                              <Percent className="h-4 w-4" />
                              <span>+{priceChange.value}%</span>
                            </>
                          )}
                          {priceChange.type === 'decrease' && (
                            <>
                              <Percent className="h-4 w-4" />
                              <span>-{priceChange.value}%</span>
                            </>
                          )}
                          {priceChange.type === 'fixed' && (
                            <>
                              <PoundSterling className="h-4 w-4" />
                              <span>£{priceChange.value.toFixed(2)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingPriceChange(priceChange)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => deletePriceChange(priceChange.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <div>
                      {format(new Date(priceChange.startDate), 'dd MMM yyyy')} -
                      {format(new Date(priceChange.endDate), 'dd MMM yyyy')}
                    </div>
                    {priceChange.daysOfWeek.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {priceChange.daysOfWeek.map(day => (
                          <Badge key={day} variant="secondary" className="capitalize">
                            {day}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {priceChange.timeStart && priceChange.timeEnd && (
                      <div className="mt-1">
                        {priceChange.timeStart} - {priceChange.timeEnd}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={addPriceChange}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Price Change
              </Button>
            </div>

            {editingPriceChange && (
              <Dialog open={true} onOpenChange={() => setEditingPriceChange(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingPriceChange.id ? 'Edit Price Change' : 'Add Price Change'}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={editingPriceChange.name}
                        onChange={(e) => setEditingPriceChange(prev => ({
                          ...prev!,
                          name: e.target.value
                        }))}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Type</Label>
                        <select
                          value={editingPriceChange.type}
                          onChange={(e) => 
                            setEditingPriceChange(prev => ({
                              ...prev!,
                              type: e.target.value as PriceChange['type']
                            }))
                          }
                          className="w-full h-10 rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          <option value="increase">Increase (%)</option>
                          <option value="decrease">Decrease (%)</option>
                          <option value="fixed">Fixed Price (£)</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="value">Value</Label>
                        <Input
                          id="value"
                          type="number"
                          step={editingPriceChange.type === 'fixed' ? '0.01' : '1'}
                          value={editingPriceChange.value}
                          onChange={(e) => setEditingPriceChange(prev => ({
                            ...prev!,
                            value: parseFloat(e.target.value) || 0
                          }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={editingPriceChange.startDate}
                          onChange={(e) => setEditingPriceChange(prev => ({
                            ...prev!,
                            startDate: e.target.value
                          }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={editingPriceChange.endDate}
                          onChange={(e) => setEditingPriceChange(prev => ({
                            ...prev!,
                            endDate: e.target.value
                          }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Days of Week</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {DAYS_OF_WEEK.map(day => (
                          <Badge
                            key={day}
                            variant={editingPriceChange.daysOfWeek.includes(day) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              setEditingPriceChange(prev => {
                                const daysOfWeek = prev!.daysOfWeek.includes(day)
                                  ? prev!.daysOfWeek.filter(d => d !== day)
                                  : [...prev!.daysOfWeek, day]
                                return { ...prev!, daysOfWeek }
                              })
                            }}
                          >
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="timeStart">Start Time (Optional)</Label>
                        <Input
                          id="timeStart"
                          type="time"
                          value={editingPriceChange.timeStart || ''}
                          onChange={(e) => setEditingPriceChange(prev => ({
                            ...prev!,
                            timeStart: e.target.value
                          }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="timeEnd">End Time (Optional)</Label>
                        <Input
                          id="timeEnd"
                          type="time"
                          value={editingPriceChange.timeEnd || ''}
                          onChange={(e) => setEditingPriceChange(prev => ({
                            ...prev!,
                            timeEnd: e.target.value
                          }))}
                        />
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setEditingPriceChange(null)}>
                      Cancel
                    </Button>
                    <Button onClick={() => savePriceChange(editingPriceChange)}>
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          <TabsContent value="items" className="space-y-6">
            <div className="space-y-6">
              {/* Filter controls */}
              <div className="flex items-center justify-end space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="show-categories"
                    checked={Boolean(currentItem.showOnlyCategoriesWithSelectedItems)}
                    onCheckedChange={(checked) => 
                      setCurrentItem(prev => ({ 
                        ...prev, 
                        showOnlyCategoriesWithSelectedItems: checked 
                      }))
                    }
                  />
                  <Label htmlFor="show-categories">Show only categories with selected items</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="show-selected"
                    checked={Boolean(currentItem.showOnlySelectedItems)}
                    onCheckedChange={(checked) => 
                      setCurrentItem(prev => ({ 
                        ...prev, 
                        showOnlySelectedItems: checked 
                      }))
                    }
                  />
                  <Label htmlFor="show-selected">Show only selected items</Label>
                </div>
              </div>

              {/* Available menu items */}
              <div className="space-y-2">
                {/* Item rows - using sample menu items */}
                {[
                  { id: 'item1', name: 'Original Chicken Tex Mex or Veggie Legend Wrap', price: 0.00 },
                  { id: 'item2', name: 'Any Drink', price: 0.00 },
                  { id: 'item3', name: 'Side Salad', price: 2.50 },
                  { id: 'item4', name: 'French Fries', price: 1.99 }
                ].map((menuItem) => {
                  const isSelected = currentItem.selectedItems?.includes(menuItem.id);
                  
                  // Skip if we're only showing selected and this isn't selected
                  if (currentItem.showOnlySelectedItems && !isSelected) {
                    return null;
                  }
                  
                  return (
                    <div key={menuItem.id} className="flex justify-between items-center py-3 border-b">
                      <div className="flex items-center space-x-3">
                        <Switch 
                          id={`menu-item-${menuItem.id}`}
                          checked={isSelected}
                          onCheckedChange={(checked) => {
                            setCurrentItem(prev => {
                              const currentSelected = prev.selectedItems || [];
                              const newSelected = checked 
                                ? [...currentSelected, menuItem.id]
                                : currentSelected.filter(id => id !== menuItem.id);
                              
                              return {
                                ...prev,
                                selectedItems: newSelected
                              };
                            });
                          }}
                        />
                        <span>{menuItem.name}</span>
                      </div>
                      <span className="font-medium">£{menuItem.price.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Options */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="limit-choice"
                    checked={Boolean(currentItem.limitToSingleChoice)}
                    onCheckedChange={(checked) => 
                      setCurrentItem(prev => ({ 
                        ...prev, 
                        limitToSingleChoice: checked 
                      }))
                    }
                  />
                  <Label htmlFor="limit-choice">Limit to single choice?</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="attribute-charges"
                    checked={Boolean(currentItem.addAttributeCharges)}
                    onCheckedChange={(checked) => 
                      setCurrentItem(prev => ({ 
                        ...prev, 
                        addAttributeCharges: checked 
                      }))
                    }
                  />
                  <Label htmlFor="attribute-charges">Add attribute charges?</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="use-product-prices"
                    checked={Boolean(currentItem.useProductPrices)}
                    onCheckedChange={(checked) => 
                      setCurrentItem(prev => ({ 
                        ...prev, 
                        useProductPrices: checked 
                      }))
                    }
                  />
                  <Label htmlFor="use-product-prices">Use the prices of the product selected in the group? (The price on the Group item will be ignored)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="dropdown-choice"
                    checked={Boolean(currentItem.showChoiceAsDropdown)}
                    onCheckedChange={(checked) => 
                      setCurrentItem(prev => ({ 
                        ...prev, 
                        showChoiceAsDropdown: checked 
                      }))
                    }
                  />
                  <Label htmlFor="dropdown-choice">Show choice as dropdown?</Label>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            {DAYS_OF_WEEK.map(day => {
              const dayAvailability = currentItem.availability?.[day]
              return (
                <div key={day} className="space-y-4 border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={dayAvailability?.isAvailable}
                        onCheckedChange={() => handleAvailabilityToggle(day)}
                      />
                      <Label className="capitalize">{day}</Label>
                    </div>
                    <select
                      value={dayAvailability?.type}
                      onChange={(e) => 
                        handleAvailabilityTypeChange(day, e.target.value as DayAvailability['type'])
                      }
                      disabled={!dayAvailability?.isAvailable}
                      className="w-[180px] rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="All Day">All Day</option>
                      <option value="Specific Times">Specific Times</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                  </div>

                  {dayAvailability?.isAvailable && dayAvailability.type === 'Specific Times' && (
                    <div className="space-y-2 pl-10">
                      {dayAvailability.times?.map((timeSlot, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <Input
                            type="time"
                            value={timeSlot.start}
                            onChange={(e) => updateTimeSlot(day, index, 'start', e.target.value)}
                            className="w-32"
                          />
                          <span>to</span>
                          <Input
                            type="time"
                            value={timeSlot.end}
                            onChange={(e) => updateTimeSlot(day, index, 'end', e.target.value)}
                            className="w-32"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTimeSlot(day, index)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addTimeSlot(day)}
                        className="mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Time Slot
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </TabsContent>

          <TabsContent value="allergens" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Contains</h3>
                <div className="flex flex-wrap gap-2">
                  {COMMON_ALLERGENS.map(allergen => {
                    const isContains = currentItem.allergens?.contains.includes(allergen.id)
                    const isMayContain = currentItem.allergens?.mayContain.includes(allergen.id)
                    
                    return (
                      <Badge
                        key={allergen.id}
                        variant={isContains ? "default" : "outline"}
                        className={`cursor-pointer ${
                          isContains ? 'bg-red-500 hover:bg-red-600' : 
                          isMayContain ? 'text-amber-500 border-amber-500' : ''
                        }`}
                        onClick={() => toggleAllergen(allergen.id, 'contains')}
                      >
                        {allergen.name}
                      </Badge>
                    )
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">May Contain</h3>
                <div className="flex flex-wrap gap-2">
                  {COMMON_ALLERGENS.map(allergen => {
                    const isContains = currentItem.allergens?.contains.includes(allergen.id)
                    const isMayContain = currentItem.allergens?.mayContain.includes(allergen.id)
                    
                    return (
                      <Badge
                        key={allergen.id}
                        variant={isMayContain ? "default" : "outline"}
                        className={`cursor-pointer ${
                          isMayContain ? 'bg-amber-500 hover:bg-amber-600' : 
                          isContains ? 'text-red-500 border-red-500' : ''
                        }`}
                        onClick={() => toggleAllergen(allergen.id, 'mayContain')}
                      >
                        {allergen.name}
                      </Badge>
                    )
                  })}
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-500">
                  Click on an allergen to toggle its status. An allergen cannot be both "Contains" and "May Contain" at the same time.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <div>
                <Label htmlFor="till-id">Till Provider Product ID</Label>
                <Input
                  id="till-id"
                  value={currentItem.tillProviderId || ''}
                  onChange={(e) => handleTextChange(e, 'tillProviderId')}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="css-class">CSS Class</Label>
                <Input
                  id="css-class"
                  value={currentItem.cssClass || ''}
                  onChange={(e) => handleTextChange(e, 'cssClass')}
                  className="mt-1"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="free-delivery"
                    checked={Boolean(currentItem.freeDelivery)}
                    onCheckedChange={(checked) => 
                      setCurrentItem(prev => ({ 
                        ...prev, 
                        freeDelivery: checked 
                      }))
                    }
                  />
                  <Label htmlFor="free-delivery">Free Delivery</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="collection-only"
                    checked={Boolean(currentItem.collectionOnly)}
                    onCheckedChange={(checked) => 
                      setCurrentItem(prev => ({ 
                        ...prev, 
                        collectionOnly: checked 
                      }))
                    }
                  />
                  <Label htmlFor="collection-only">Collection Only</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="deleted"
                    checked={Boolean(currentItem.deleted)}
                    onCheckedChange={(checked) => 
                      setCurrentItem(prev => ({ 
                        ...prev, 
                        deleted: checked 
                      }))
                    }
                  />
                  <Label htmlFor="deleted">Deleted</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="hide-price"
                    checked={Boolean(currentItem.hidePrice)}
                    onCheckedChange={(checked) => 
                      setCurrentItem(prev => ({ 
                        ...prev, 
                        hidePrice: checked 
                      }))
                    }
                  />
                  <Label htmlFor="hide-price">Hide Price</Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 